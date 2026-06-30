export type Language = {
  id: string;
  name: string;
  href: string;
  description: string;
};

export const languages: Language[] = [
  {
    id: "python",
    name: "Python",
    href: "/python",
    description: "슬라이싱, 리스트, 딕셔너리, 함수 등",
  },
  {
    id: "c",
    name: "C",
    href: "/c",
    description: "포인터, 배열, 구조체 등",
  },
  {
    id: "java",
    name: "Java",
    href: "/java",
    description: "OOP, 상속, 인터페이스 등",
  },
];
