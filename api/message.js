// Vercel 서버리스 함수: GET /api/message?name=닉네임
// 응원 문장 15개 중 하나를 골라 이름과 함께 보냅니다.

const MESSAGES = [
  "{name}, 오늘도 여기까지 온 것만으로 충분히 잘하고 있어요.",
  "{name}의 작은 한 걸음이 내일의 큰 변화를 만들어요.",
  "{name}, 천천히 가도 괜찮아요. 멈추지 않는 게 중요해요.",
  "오늘 {name}이(가) 웃을 일이 꼭 하나는 생길 거예요.",
  "{name}, 실수해도 괜찮아요. 그만큼 배우고 있다는 뜻이니까요.",
  "{name}의 노력은 보이지 않아도 분명히 쌓이고 있어요.",
  "{name}, 지금 모습 그대로도 정말 멋져요.",
  "힘든 하루라도 {name}은(는) 결국 해낼 거예요.",
  "{name}, 오늘은 스스로에게 조금 더 친절해지는 날이에요.",
  "{name}이(가) 있어서 누군가의 하루가 더 따뜻해지고 있어요.",
  "{name}, 숨 한 번 크게 쉬고, 다시 시작해 봐요.",
  "{name}의 꾸준함이 가장 큰 재능이에요.",
  "오늘 {name}이(가) 해낸 일, 작아 보여도 대단한 거예요.",
  "{name}, 걱정보다 잘될 거예요. 늘 그래왔듯이요.",
  "{name}, 오늘 하루도 정말 수고 많았어요. 응원해요!",
];

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "GET 요청만 받을 수 있어요." });
  }

  const raw = typeof req.query.name === "string" ? req.query.name : "";
  const name = raw.trim().slice(0, 20) || "여러분";

  const template = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  const message = template.split("{name}").join(name);

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ name, message });
};
