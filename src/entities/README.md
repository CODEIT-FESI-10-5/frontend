# entities

- **핵심 도메인(비즈니스 모델) 단위의 상태, 타입, API, UI 컴포넌트가 위치합니다.**
- 예시: user, todo, note, profile, dashboard 등

## 폴더/파일 예시

- `model.ts` : zustand 등 상태 관리, 타입 정의
- `api.ts` : react-query용 fetcher, 쿼리 훅
- `msw.ts` : msw 핸들러(도메인별)
- `EntityComponent.tsx` : 엔티티 UI 컴포넌트
- `EntityComponent.stories.tsx` : Storybook 파일
- `EntityComponent.test.tsx` : 테스트 파일
