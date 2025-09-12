<!-- src/pages/TipsPage.vue -->
<template>
  <section class="tips-page">
    <!-- Hero / Banner (배경 그대로) -->
    <div
      class="hero text-center text-white py-5"
      style="background-color: #ffcc40"
    >
      <h1>Pet Care Tips & Tricks</h1>
      <p>Helpful advice to keep your furry friends happy and healthy</p>
    </div>

    <!-- Quick Tips -->
    <div class="container section">
      <h3 class="section-title">QUICK TIPS</h3>
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="card card-surface">
            <img
              :src="img.brush"
              class="thumb"
              alt="Brushing dog"
              loading="lazy"
            />
            <div class="card-body">
              <p class="card-text">
                Brushing your dog regularly reduces shedding!
              </p>
              <a href="#" class="btn btn-accent">Read More</a>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-lg-4">
          <div class="card card-surface">
            <img
              :src="img.blue"
              class="thumb"
              alt="Training with treats"
              loading="lazy"
            />
            <div class="card-body">
              <p class="card-text">
                Use treats to train your pet effectively. Let's do it
              </p>
              <a href="#" class="btn btn-accent">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Helpful Articles -->
    <div class="container section">
      <h3 class="section-title">HELPFUL ARTICLE</h3>
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="card card-surface">
            <img
              :src="img.treats"
              class="thumb"
              alt="Active indoor pet"
              loading="lazy"
            />
            <div class="card-body">
              <p class="card-text">5 Ways to Keep Your Pet Active Indoors</p>
              <a href="#" class="btn btn-accent">Read More</a>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-lg-4">
          <div class="card card-surface">
            <img
              :src="img.old"
              class="thumb"
              alt="Bathing an older dog"
              loading="lazy"
            />
            <div class="card-body">
              <p class="card-text">How Often Should You Bathe Your Dog?</p>
              <a href="#" class="btn btn-accent">Read More</a>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <a href="#" class="btn btn-accent">See More Tips →</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import brush from "../assets/brushdog.jpg";
import blue from "../assets/bluedog.jpg";
import treats from "../assets/treastdog.jpg";
import old from "../assets/olddog.jpg";
const img = { brush, blue, treats, old };
</script>

<style scoped>
/* 페이지 기본 톤만 정리 (배경 변수는 건드리지 않음) */
.tips-page {
  color: var(--text, #222);
}

/* 섹션 간격 */
.section {
  padding: 56px 0 40px;
}

/* 섹션 타이틀: 가독성 + 일관성 */
.section-title {
  text-align: center;
  font-weight: 800;
  letter-spacing: 0.06em;
  font-size: 1.6rem;
  margin-bottom: 26px;
  color: var(--text, #222);
}

/* 카드: 동일 높이 + 정렬 + 미세 인터랙션 */
.card-surface {
  background: var(--surface, #fff);
  border: 1px solid var(--outline, #e8e8e8);
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.card-surface:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}

/* 썸네일을 통일된 비율로 */
.thumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* 카드 내용: 버튼이 항상 하단에 오게 */
.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  flex: 1;
}
.card-text {
  margin: 0;
  color: var(--text, #222);
}

/* 버튼: 배경과 구분되는 포인트 컬러(다크/라이트와 무관) */
.btn-accent {
  --accent: var(--accent, #2563eb); /* 전역에 없으면 파란색 기본 */
  background-color: var(--accent);
  color: #fff;
  border-radius: 999px;
  padding: 8px 18px;
  font-weight: 600;
  border: none;
  align-self: flex-start;
  transition: filter 0.15s ease, transform 0.02s ease;
}
.btn-accent:hover {
  filter: brightness(0.92);
}
.btn-accent:active {
  transform: translateY(1px);
}

/* 반응형 간격 */
@media (min-width: 992px) {
  .section-title {
    font-size: 1.8rem;
  }
}
</style>
