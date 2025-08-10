import { zodResolver } from '@hookform/resolvers/zod';
import { joinStudySchema, JoinStudySchema, useJoinStudy } from '../model';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@/shared/ui';
import CloseIcon from '@/assets/icon-close.svg';
import { useModal } from '@/shared/lib/utils/useModal';

export default function JoinStudyModal() {
  const { close } = useModal();
  const { mutate } = useJoinStudy();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<JoinStudySchema>({
    resolver: zodResolver(joinStudySchema),
    defaultValues: {
      inviteCode: '',
    },
    mode: 'onChange',
  });
  const onValid = ({ inviteCode }: JoinStudySchema) => {
    mutate(inviteCode);
    close();
  };
  return (
    <div className="rounded-12 bg-surface-2 relative flex h-303 w-327 flex-col gap-30 px-24 py-38 md:h-338 md:w-518 md:p-38">
      <div className="flex w-full flex-col gap-16">
        <div className="flex w-full justify-between">
          <p className="headline-large text-text-white">초대코드 입력</p>
          <CloseIcon className="h-30 w-30 cursor-pointer" onClick={close} />
        </div>
        <p className="body-medium text-text-secondary">
          팀장에게 받은 코드를 입력해 주세요.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onValid)}
        className="flex h-165 w-full flex-col justify-between"
      >
        <TextField
          type="text"
          placeholder="알파벳 대/소문자,숫자 8자리"
          error={!!errors.inviteCode}
          errorMessage={errors.inviteCode?.message}
          {...register('inviteCode', { required: true })}
        />
        <Button
          label="확인"
          size="lg"
          disabled={!isValid}
          theme="primary"
          type="submit"
          className="top-36 md:top-56"
        />
      </form>
    </div>
  );
}
