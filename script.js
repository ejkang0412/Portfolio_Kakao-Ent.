// ==============================
// 0) Helpers
// ==============================
const snap = document.getElementById("snap"); // <main class="snap" id="snap">

function lockSnapScroll(lock) {
  if (!snap) return;
  snap.style.overflowY = lock ? "hidden" : "auto";
}

// ==============================
// 1) Mobile Nav
// ==============================
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navMobile.hidden = isOpen;
});

// 모바일 메뉴 클릭 시 닫기 + 스냅 스크롤로 이동
navMobile?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navMobile.hidden = true;
  });
});


// ==============================
// 2) Footer Year
// ==============================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());


// ==============================
// 3) Snap Nav Scroll (IMPORTANT)
// - body는 overflow:hidden 이라 window가 아니라 snap이 스크롤됨
// - nav의 #about 같은 앵커 클릭을 snap 스크롤로 변환
// ==============================
function scrollToHash(hash) {
  if (!snap) return;

  if (!hash || hash === "#top" || hash === "#home") {
    snap.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const target = document.querySelector(hash);
  if (!target) return;

  const top = target.offsetTop; // snap 내부 flow 기준
  snap.scrollTo({ top, behavior: "smooth" });
}

function interceptAnchorClicks(root = document) {
  root.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href) return;

      // 기본 앵커 이동 막고 snap 스크롤로 이동
      e.preventDefault();
      history.replaceState(null, "", href);
      scrollToHash(href);
    });
  });
}

interceptAnchorClicks(); // top nav + footer + mobile 포함

// 새로고침/첫 진입 시 URL 해시가 있으면 해당 챕터로
window.addEventListener("load", () => {
  if (location.hash) scrollToHash(location.hash);
});


// ==============================
// 4) Project Modal Data
// ==============================
const PROJECTS = {
  p1: {
    title: "전략적 다이렉트 소싱 참여",
    summary:
      "신사업 ‘재무팀장급’ 포지션 다이렉트 소싱 지원. JD 기반 롱리스트를 빠르게 구성해 초기 의사결정을 지원.",
    meta: {
      company: "Smilegate Holdings | <br/>
                      Talent Relations Team",
      period: "2025.12 ~ 진행중",
      role: "다이렉트 소싱 실무 지원",
      goal: "JD 기반 검토 가능한 롱리스트를 빠르게 구성"
    },
    bullets: [
      "LinkedIn, Remember 등 외부 채널 기반 후보자 발굴 (X-ray 서치 포함)",
      "JD 기준으로 경력·산업·직급 적합도 분석 후<br/>
       롱리스트 작성",
      "트랙레코드·조직 적합성 중심 정성 코멘트 정리",
      "단순 이력 나열이 아닌, 채용 의사결정 참고용 <br/>
       인재 자료 제공"
    ],
    contributions: [
      "타겟 후보자 풀을 빠르게 정의하고 초기 검토 가능한 자료 형태로 구조화",
      "후보자별 ‘왜 적합한지’가 보이는 코멘트 체계화</br>
       (정성 근거 중심)"
    ]
  },

  p2: {
    title: "자체 인텔리전스 플랫폼 데이터 고도화",
    summary:
      "외부 채널 기반 인재 정보를 내부 인텔리전스 플랫폼(ETM) DB로 전환. 기준 수립·정제·검증으로 운영 신뢰도 확보.",
    meta: {
      company: "Smilegate Holdings | <br/>
                      Talent Relations Team",
      period: "2025.09 ~ 2025.11",
      role: "인재 데이터 구축 및 분류 지원",
      goal: "외부 인재 정보를 내부 DB로 전환 + 정확성/운영 신뢰도 강화"
    },
    bullets: [
      "오픈 웹 기반 인재 정보를 내부 기준(업무 영역·직급·숙련도)으로 1차 스크리닝/라벨링",
      "PO와 협업해 데이터 정제·분류 기준 수립 및 <br/>
       DB 구축 전 과정 참여",
      "게임 프로젝트 DB 증강 및 정밀화(2차 정확성 검토)"
    ],
    contributions: [
      "데이터 정확성 관점에서 분류 기준을 맞추고<br/>
       검증 루프에 기여",
      "리드타임 단축(예: 3개월 → 1.5개월)"
    ]
  },

  p3: {
    title: "친환경 창업 프로젝트 ‘Pill Good’",
    summary:
      "침입식물 ‘환삼덩굴’ 문제를 자원 전환으로 재정의. 제작비 확보 → OEM/연구원 협업 → 시제품 검증 → 팝업 테스트 → 개선까지 실행.",
    meta: {
      company: "Pill Good",
      period: "2024.09 ~ 2025.11",
      role: "총괄",
      goal: "문제 인식–제작–검증–개선의 실행형 프로젝트 완주"
    },
    bullets: [
      "학교 창업경진대회·공모전 참여로 제작비 확보",
      "OEM 업체 및 원료 연구원과 협업해 제형·성분·제조 공정 검증",
      "BMW YIDP 기반 팝업에서 실사용자 테스트<br/>
       및 피드백 수집",
      "사용성·패키징·메시지 전달 방식 개선 인사이트 도출"
    ],
    contributions: [
      "리소스 확보부터 제품 검증까지 실행 로드맵을 연결(End-to-End)",
      "피드백 기반 개선/커뮤니케이션 전략 도출"
    ]
  }
};


// ==============================
// 5) Modal Logic (snap 구조에 맞춰 잠금)
// ==============================
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

function openModal(projectKey){
  const p = PROJECTS[projectKey];
  if (!p || !modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="detail">
      <div class="detail__head">
        <div>
          <h3 class="detail__title">${p.title}</h3>
          <p style="margin:0; color:#bdbdbd; line-height:1.7;">${p.summary}</p>
        </div>

        <div class="detail__meta">
          <div class="kv"><b>조직</b><span>${p.meta.company}</span></div>
          <div class="kv"><b>기간</b><span>${p.meta.period}</span></div>
          <div class="kv"><b>역할</b><span>${p.meta.role}</span></div>
          <div class="kv"><b>목표</b><span>${p.meta.goal}</span></div>
        </div>
      </div>

      <div class="detail__body">
        <div class="detail__box">
          <h4>주요 수행</h4>
          <ul>${p.bullets.map(x => `<li>${x}</li>`).join("")}</ul>
        </div>

        <div class="detail__box">
          <h4>핵심 기여</h4>
          <ul>${p.contributions.map(x => `<li>${x}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  // ✅ body가 아니라 snap만 잠금
  lockSnapScroll(true);
}

function closeModal(){
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  lockSnapScroll(false);
}

document.querySelectorAll(".projectCard").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.project));
});

modalClose?.addEventListener("click", closeModal);

// backdrop 클릭 닫기
modal?.addEventListener("click", (e) => {
  const t = e.target;
  if (t?.dataset?.close === "true") closeModal();
});

// ESC 닫기
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
});


// ==============================
// 6) Scroll Reveal (IntersectionObserver)
// - root를 snap으로 지정해야 "샤라라"가 제대로 됨
// ==============================
(() => {
  const targets = document.querySelectorAll(
    ".hero .container, .section .container, .footer .container, .section__head, .about__card, .skillCard, .projectCard, .vision__card, .pill, .quote"
  );

  targets.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
        if (delay) el.style.transitionDelay = `${delay}ms`;

        el.classList.add("reveal--soft");
        requestAnimationFrame(() => el.classList.add("is-visible"));

        observer.unobserve(el);
      });
    },
    {
      root: snap || null,          // ✅ 핵심
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  targets.forEach(el => observer.observe(el));
})();
