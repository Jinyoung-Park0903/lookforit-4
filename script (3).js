
// 유전자 데이터베이스
const geneticData = {
    eyelid: {
        double: { type: 'dominant', description: '쌍꺼풀은 우성 형질로 한 개의 우성 유전자만 있어도 나타납니다.' },
        single: { type: 'recessive', description: '외꺼풀은 열성 형질로 두 개의 열성 유전자가 있어야 나타납니다.' }
    },
    earlobe: {
        free: { type: 'dominant', description: '떨어진 귓불은 우성 형질입니다.' },
        attached: { type: 'recessive', description: '붙은 귓불은 열성 형질입니다.' }
    },
    thumb: {
        straight: { type: 'dominant', description: '곧은 엄지손가락은 우성 형질입니다.' },
        curved: { type: 'recessive', description: '구부러진 엄지손가락은 열성 형질입니다.' }
    },
    hairline: {
        widow: { type: 'dominant', description: 'M자 이마는 우성 형질입니다.' },
        straight: { type: 'recessive', description: '일직선 이마는 열성 형질입니다.' }
    },
    tongue: {
        roll: { type: 'dominant', description: '혀 말기 능력은 우성 형질입니다.' },
        noroll: { type: 'recessive', description: '혀를 말 수 없는 것은 열성 형질입니다.' }
    },
    dimple: {
        present: { type: 'dominant', description: '보조개는 우성 형질입니다.' },
        absent: { type: 'recessive', description: '보조개가 없는 것은 열성 형질입니다.' }
    },
    fingers: {
        left: { type: 'dominant', description: '왼손 엄지가 위로 가는 것은 우성 형질입니다.' },
        right: { type: 'recessive', description: '오른손 엄지가 위로 가는 것은 열성 형질입니다.' }
    },
    arms: {
        left: { type: 'recessive', description: '왼팔이 위로 가는 것은 열성 형질입니다.' },
        right: { type: 'dominant', description: '오른팔이 위로 가는 것은 우성 형질입니다.' }
    },
    nose: {
        prominent: { type: 'dominant', description: '높은 콧대는 우성 형질입니다.' },
        flat: { type: 'recessive', description: '낮은 콧대는 열성 형질입니다.' }
    },
    chin: {
        cleft: { type: 'dominant', description: '턱 갈라짐은 우성 형질입니다.' },
        smooth: { type: 'recessive', description: '턱 갈라짐이 없는 것은 열성 형질입니다.' }
    },
    wrist: {
        bend: { type: 'dominant', description: '손목이 90도 이상 굽어지는 것은 우성 형질입니다.' },
        straight: { type: 'recessive', description: '손목이 90도 미만으로 굽어지는 것은 열성 형질입니다.' }
    },
    pinky: {
        curved: { type: 'dominant', description: '구부러진 새끼손가락은 우성 형질입니다.' },
        straight: { type: 'recessive', description: '곧은 새끼손가락은 열성 형질입니다.' }
    }
};

// 특성 이름 매핑
const traitNames = {
    eyelid: '눈꺼풀 모양',
    earlobe: '귓불 모양',
    thumb: '엄지손가락',
    hairline: '머리카락 선',
    tongue: '혀 말기',
    dimple: '보조개',
    fingers: '손가락 끼우기',
    arms: '팔짱 끼기',
    nose: '코 모양',
    chin: '턱 모양',
    wrist: '손목 굽히기',
    pinky: '새끼손가락'
};

// 형질 이름 매핑
const traitValueNames = {
    double: '쌍꺼풀',
    single: '외꺼풀',
    free: '떨어진 귓불',
    attached: '붙은 귓불',
    straight: '곧은 형태',
    curved: '구부러진 형태',
    widow: 'M자 이마',
    roll: '혀를 말 수 있음',
    noroll: '혀를 말 수 없음',
    present: '보조개 있음',
    absent: '보조개 없음',
    left: '왼쪽',
    right: '오른쪽',
    prominent: '높은 콧대',
    flat: '낮은 콧대',
    cleft: '턱 갈라짐 있음',
    smooth: '턱 갈라짐 없음',
    bend: '90도 이상 굽어짐',
};

// traitValueNames에서 누락된 값들 추가
traitValueNames.straight = traitValueNames.straight || '곧은 형태';

// 선택된 특성들을 저장할 객체
let selectedTraits = {};

// DOM 요소들
const traitButtons = document.querySelectorAll('.trait-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const resetBtn = document.getElementById('reset-btn');

// 이벤트 리스너 설정
traitButtons.forEach(button => {
    button.addEventListener('click', handleTraitSelection);
});

analyzeBtn.addEventListener('click', analyzeTraits);
resetBtn.addEventListener('click', resetQuiz);

// 특성 선택 처리
function handleTraitSelection(event) {
    const button = event.target;
    const trait = button.getAttribute('data-trait');
    const value = button.getAttribute('data-value');
    
    // 같은 그룹의 다른 버튼들 선택 해제
    const groupButtons = document.querySelectorAll(`[data-trait="${trait}"]`);
    groupButtons.forEach(btn => btn.classList.remove('selected'));
    
    // 현재 버튼 선택
    button.classList.add('selected');
    selectedTraits[trait] = value;
    
    // 모든 특성이 선택되었는지 확인
    checkAllTraitsSelected();
}

// 모든 특성이 선택되었는지 확인
function checkAllTraitsSelected() {
    const totalTraits = Object.keys(geneticData).length;
    const selectedCount = Object.keys(selectedTraits).length;
    
    if (selectedCount === totalTraits) {
        analyzeBtn.disabled = false;
    } else {
        analyzeBtn.disabled = true;
    }
}

// 유전자 분석 수행
function analyzeTraits() {
    const resultTbody = document.getElementById('result-tbody');
    resultTbody.innerHTML = '';
    
    let dominantCount = 0;
    let recessiveCount = 0;
    
    // 각 특성에 대한 결과 생성
    Object.entries(selectedTraits).forEach(([trait, value]) => {
        const data = geneticData[trait][value];
        const row = document.createElement('tr');
        
        if (data.type === 'dominant') {
            dominantCount++;
        } else {
            recessiveCount++;
        }
        
        row.innerHTML = `
            <td>${traitNames[trait]}</td>
            <td>${traitValueNames[value]}</td>
            <td class="${data.type}">${data.type === 'dominant' ? '우성' : '열성'}</td>
            <td>${data.description}</td>
        `;
        
        resultTbody.appendChild(row);
    });
    
    // 요약 정보 생성
    const summaryText = document.getElementById('summary-text');
    const totalTraits = dominantCount + recessiveCount;
    const dominantPercentage = Math.round((dominantCount / totalTraits) * 100);
    
    summaryText.innerHTML = `
        총 ${totalTraits}개의 특성 중 <span class="dominant">${dominantCount}개가 우성</span>, 
        <span class="recessive">${recessiveCount}개가 열성</span> 형질입니다. 
        (우성 형질 비율: ${dominantPercentage}%)
        <br><br>
        <strong>참고:</strong> 우성 형질은 한 개의 우성 유전자만 있어도 나타나며, 
        열성 형질은 두 개의 열성 유전자가 모두 있어야 나타납니다.
    `;
    
    // 결과 섹션 표시
    quizSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
    // 결과 섹션으로 스크롤
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// 퀴즈 초기화
function resetQuiz() {
    selectedTraits = {};
    
    // 모든 버튼 선택 해제
    traitButtons.forEach(button => {
        button.classList.remove('selected');
    });
    
    // 분석 버튼 비활성화
    analyzeBtn.disabled = true;
    
    // 퀴즈 섹션 표시, 결과 섹션 숨기기
    quizSection.classList.remove('hidden');
    resultSection.classList.add('hidden');
    
    // 퀴즈 섹션으로 스크롤
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('유전자 판별 사이트가 로드되었습니다.');
});
