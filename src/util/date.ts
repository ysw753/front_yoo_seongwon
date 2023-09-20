export function timedefine(time: string | undefined): string {
  if (time === undefined) return "";

  let today = new Date();
  let createdtime = new Date(time);

  const diff = (today.getTime() - createdtime.getTime()) / 1000;
  const times = [
    { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
    { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
    { name: "일", milliSeconds: 60 * 60 * 24 },
    { name: "시간", milliSeconds: 60 * 60 },
    { name: "분", milliSeconds: 60 },
  ];
  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    // 큰 단위는 0보다 작은 소수점 값이 나옴
    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }
  return "";
}
