# @jgjgill/interaction

## 주요 기능

- 🎨 R3F를 활용한 3D 인터랙션 컴포넌트
- 🔧 TypeScript로 타입 지원
- 📚 Storybook을 통한 문서화

## 설치 방법

```bash
# npm
npm install @jgjgill/interaction three @react-three/fiber
npm install -D @types/three

# yarn
yarn add @jgjgill/interaction three @react-three/fiber
yarn add -D @types/three

# pnpm
pnpm add @jgjgill/interaction three @react-three/fiber
pnpm add -D @types/three
```

## 빠른 시작

```tsx
import { Box } from '@jgjgill/interaction'

function App() {
  return (
   <Canvas
    shadows
    camera={{ position: new THREE.Vector3(2, 2, 2) }}
    style={{ background: "black" }}
   >
    <OrbitControls autoRotate />
    <axesHelper scale={10} />
    <ambientLight intensity={0.5} />
    <pointLight position={[1, 1, 1]} />
    <Box />
   </Canvas>
  )
}
```

## 문서

예제는 [Storybook](https://677a8797b65e105991c6835b-hvnklphovx.chromatic.com/)에서 확인하실 수 있어요.

## 컴포넌트

- `<Box />`: 테스트 상자
- `<Dice />`: 3D 주사위
- `<Nameplate />`: 3D 명함
- 추가 컴포넌트 개발 중..! 🧑‍🎨

## 필요 사항

- React 18 이상
- Three.js 0.171.0 이상
- @react-three/fiber 8.17.10 이상

## 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 패키지 빌드
pnpm build

# Storybook 실행
pnpm storybook
```

## 라이선스

ISC © [jgjgill](https://github.com/jgjgill)
