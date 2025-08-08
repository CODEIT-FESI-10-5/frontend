import Button from './Button';
import type { Meta, StoryObj } from '@storybook/nextjs';
import CopyIcon from '@/assets/copy.svg';
import CheckSquareBlankIcon from '@/assets/check_square_blank.svg';
import NewTodo from '@/assets/new-todo.svg';

const meta: Meta<typeof Button> = {
  title: '공통_컴포넌트/Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    theme: {
      control: { type: 'select' },
      options: ['primary', 'tertiary', 'highlight', 'surface', 'emphasis'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Example: Story = {
  render: () => (
    <div className="bg-surface-4 flex w-600 flex-col gap-20 p-30">
      <div className="flex flex-col gap-10">
        버튼 L
        <Button label="로그인" size="lg" theme="primary" disabled />
        <Button label="로그인" size="lg" theme="primary" />
        <Button label="로그아웃" size="lg" theme="surface" />
      </div>
      <div className="flex flex-col gap-10">
        버튼 M
        <div className="flex gap-10">
          <Button label="스터디 만들기" size="md" theme="primary" />
          <Button label="코드로 가입하기" size="md" theme="tertiary" />
          <Button
            label={
              <>
                {'초대 코드 A34B5FD'}
                <CopyIcon width={24} height={24} />
              </>
            }
            size="md"
            theme="tertiary"
          />
        </div>
      </div>
      <div className="flex flex-col gap-10">
        버튼 S
        <div className="flex gap-10">
          <Button label="완료" size="sm" theme="primary" className="w-88" />
          <Button
            label={
              <div className="flex items-center gap-2">
                <CheckSquareBlankIcon width={28} height={28} />
                {'공통'}
              </div>
            }
            size="sm"
            theme="emphasis"
            className="w-88 px-14"
          />
        </div>
      </div>
      <div className="flex flex-col gap-10">
        버튼 XS
        <div className="flex gap-10">
          <Button
            label={
              <div className="flex items-center gap-4">
                <NewTodo width={20} height={20} />
                {'세부 투두 생성'}
              </div>
            }
            size="xs"
            theme="highlight"
          />
          <Button label="닉네임 수정" size="xs" theme="primary" />
          <Button label="닉네임 수정" size="xs" theme="emphasis" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Primary: Story = {
  args: {
    label: '테스트 버튼',
    size: 'lg',
    theme: 'primary',
  },
};
