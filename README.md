## `To-Do-List`

- Nomadcoders, `React Master class` 2주 Challenge
- `To Do List` 구현 과정

- 강의 URL => **https://nomadcoders.co/react-masterclass**
- 📆 개발 기간: 2024.12.02 ~ 12.04 (총 3일)
    - 마감: 2024.12.05 목요일 오전 6시

---

### 💻 기술 목록
- 고정: `Typescript`, `React`
- CSS Style: `styled-components`
- 상태 관리: `recoil`
- form: `react-hook-form`

---

### 📆 Day 0 작업 요약 (2024.12.01 일요일)
- 월 ~ 수요일까지는 저녁에 편의점 아르바이트를 하는 관계로 <br/>
    개발에 투자할 시간이 좀 부족할 것 같아서 조금 일찍 시작했다.

- **📑 "To Do List 기본 디자인, 일정 등록 구현"**
    - `To Do List`의 레이아웃을 어떤식으로 배치할 지 <br/>
        간단한 도면을 그려보고, 이후 아래와 같이 디자인하였다.

    <img src="refImgs/layouts.png"/>

    <img src="refImgs/20241201_todolist_작업물.png">

    - 위와 같이 간단하게 디자인을 설정하고 <br/>
        본격적인 기능 구현 단계에 들어갔다.
    - 일정을 입력하고, 이를 recoil state에 저장해야 하는데
    - 그냥 아무것도 없이 `<form/>`을 다루면 <br/>
        코드가 조금 복잡해질 수 있어서 `React Hook Form`을 사용하였다.
    
    - 일정을 입력하면, 이를 `recoil state`에 저장하고 <br/>
    저장된 일정은 일정 입력 `form` 하단에서 확인 가능하게 작성하였다.

    - 테마 전환 기능은 덤이다...

---

