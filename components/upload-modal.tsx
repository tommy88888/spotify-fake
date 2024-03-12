'use client';

import useUploadModal from '@/hooks/use-upload-modal';
import Modal from './modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useState } from 'react';
import InputField from './ui/input-field';

import Btn from './ui/btn';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import uniqid from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

type UploadModalProps = {};

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();

  const router = useRouter();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueId = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error('Failed to upload song.');
      }
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed to upload image.');
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success('Song created');
      uploadModal.onClose();
    } catch (err: unknown) {
      toast.error('Something went wrong');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title='Add a song'
      description='Upload an mp3 file'
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-4 '
      >
        <InputField
          id='title'
          type='text'
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder='Song Title'
        />
        <InputField
          id='author'
          type='text'
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder='Song Author'
        />
        <div>
          <div className='pb-1'>Select a song file</div>
          <InputField
            id='song'
            type='file'
            disabled={isLoading}
            accept='.mp3'
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className='pb-1'>Select a song image</div>
          <InputField
            id='image'
            type='file'
            disabled={isLoading}
            accept='image/*'
            {...register('image', { required: true })}
          />
        </div>
        <Btn disabled={isLoading} type='submit'>
          Create
        </Btn>
      </form>
    </Modal>
  );
};

export default UploadModal;
