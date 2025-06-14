const questions = [
  {
    question: "Apa itu HTML?",
    options: ["Bahasa pemrograman", "Bahasa markup", "Bahasa server-side", "Bahasa database"],
    answer: 1,
    explanation: "HTML adalah bahasa markup untuk membuat struktur halaman web."
  },
  {
    question: "Tag HTML untuk membuat link adalah?",
    options: ["<link>", "<a>", "<href>", "<src>"],
    answer: 1,
    explanation: "<a> digunakan untuk membuat hyperlink."
  },
  {
    question: "CSS digunakan untuk?",
    options: ["Struktur web", "Interaksi pengguna", "Desain dan tata letak", "Pengolahan data"],
    answer: 2,
    explanation: "CSS digunakan untuk styling halaman web."
  },
  {
    question: "JavaScript digunakan untuk?",
    options: ["Desain tampilan", "Validasi form", "Mengelola database", "Menulis server"],
    answer: 1,
    explanation: "JavaScript dapat digunakan untuk validasi form dan interaksi di sisi klien."
  },
  {
    question: "Properti CSS untuk mengubah warna teks adalah?",
    options: ["font-color", "text-color", "color", "text-style"],
    answer: 2,
    explanation: "'color' adalah properti untuk warna teks."
  },
  {
    question: "Untuk memasukkan JavaScript dalam HTML digunakan tag?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    answer: 0,
    explanation: "<script> digunakan untuk menyisipkan JavaScript."
  },
  {
    question: "Tag HTML untuk membuat tabel adalah?",
    options: ["<table>", "<tab>", "<tbl>", "<grid>"],
    answer: 0,
    explanation: "<table> adalah tag standar HTML untuk membuat tabel."
  },
  {
    question: "Sintaks CSS yang benar untuk membuat warna latar belakang merah adalah?",
    options: ["background-color: red;", "bg-color=red;", "color: red;", "background=red;"],
    answer: 0,
    explanation: "Sintaks CSS yang benar adalah 'background-color: red;'"
  },
  {
    question: "Fungsi dari DOM dalam JavaScript adalah?",
    options: ["Mengatur database", "Membuat animasi", "Manipulasi struktur dokumen HTML", "Mengatur server"],
    answer: 2,
    explanation: "DOM memungkinkan JavaScript berinteraksi dengan struktur HTML."
  },
  {
    question: "Apa yang dimaksud dengan responsive design?",
    options: ["Desain cepat", "Desain adaptif untuk berbagai perangkat", "Desain server-side", "Desain 3D"],
    answer: 1,
    explanation: "Responsive design adalah pendekatan agar tampilan web menyesuaikan ukuran layar."
  }
];

let current = 0;
let score = 0;
let timer;
let timeLeft = 300;

function startQuiz() {
  const username = document.getElementById('username').value.trim();
  if (!username) {
    alert("Masukkan nama terlebih dahulu!");
    return;
  }
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('quiz-screen').classList.remove('hidden');
  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById('question-number').textContent = `Soal ${current + 1} dari ${questions.length}`;
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('options').innerHTML = '';
  document.getElementById('explanation').textContent = '';
  document.getElementById('next-btn').disabled = true;

  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.textContent = opt;
    div.onclick = () => selectAnswer(div, i);
    document.getElementById('options').appendChild(div);
  });
}

function selectAnswer(element, index) {
  const q = questions[current];
  const options = document.querySelectorAll('.option');
  options.forEach(opt => {
    opt.classList.add('disabled');
    opt.onclick = null;
  });
  if (index === q.answer) {
    element.classList.add('correct');
    score++;
  } else {
    element.classList.add('wrong');
    options[q.answer].classList.add('correct');
  }
  document.getElementById('next-btn').disabled = false;
  document.getElementById('explanation').textContent = "Pembahasan: " + q.explanation;
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    clearInterval(timer);
    showScore();
  }
}

function showScore() {
  document.getElementById('question-text').textContent = `Skor Anda: ${score} dari ${questions.length}`;
  document.getElementById('options').innerHTML = '';
  document.getElementById('question-number').textContent = '';
  document.getElementById('next-btn').classList.add('hidden');
  document.getElementById('explanation').textContent = '';
  document.getElementById('restart-btn').classList.remove('hidden');
}

function restartQuiz() {
  current = 0;
  score = 0;
  timeLeft = 300;
  document.getElementById('restart-btn').classList.add('hidden');
  document.getElementById('next-btn').classList.remove('hidden');
  startQuiz();
}

function startTimer() {
  timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `Waktu: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      showScore();
    }
  }, 1000);
}
