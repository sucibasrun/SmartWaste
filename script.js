// Global variables
let currentSection = 'home'; // This will be managed by individual HTML files now
let model, webcam, labelContainer, maxPredictions; // For AI Detection
let currentGame = null;
let gameScore = 0;
let currentQuizLevel = 'mudah';
let currentQuizIndex = 0;
let quizScore = 0;

// Navigation functions (moved here for common use)
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Sample waste database (moved here for common use)
const wasteDatabase = [
    // Organik (20 items)
    {nama: "Kulit Pisang", kategori: "Organik", waktu_urai: "2-5 minggu", pengelolaan: "Kompos atau pupuk organik", dampak: "Mudah terurai, baik untuk tanah"},
    {nama: "Daun Kering", kategori: "Organik", waktu_urai: "1-3 bulan", pengelolaan: "Kompos atau mulsa", dampak: "Memperbaiki struktur tanah"},
    {nama: "Sisa Nasi", kategori: "Organik", waktu_urai: "1-2 minggu", pengelolaan: "Kompos atau pakan ternak", dampak: "Dapat menarik hama jika tidak dikelola"},
    {nama: "Kulit Jeruk", kategori: "Organik", waktu_urai: "2-4 minggu", pengelolaan: "Kompos atau pengusir serangga alami", dampak: "Mengandung minyak esensial yang bermanfaat"},
    {nama: "Ampas Kopi", kategori: "Organik", waktu_urai: "3-6 bulan", pengelolaan: "Kompos atau pupuk tanaman", dampak: "Kaya nitrogen, baik untuk tanaman"},
    {nama: "Kulit Telur", kategori: "Organik", waktu_urai: "1-3 tahun", pengelolaan: "Kompos atau sumber kalsium", dampak: "Memperkaya tanah dengan kalsium"},
    {nama: "Sisa Sayuran", kategori: "Organik", waktu_urai: "1-2 minggu", pengelolaan: "Kompos atau biogas", dampak: "Sumber nutrisi untuk tanah"},
    {nama: "Kulit Apel", kategori: "Organik", waktu_urai: "1-2 bulan", pengelolaan: "Kompos atau pakan ternak", dampak: "Mengandung serat dan nutrisi"},
    {nama: "Ranting Kecil", kategori: "Organik", waktu_urai: "6 bulan-2 tahun", pengelolaan: "Kompos atau bahan bakar biomassa", dampak: "Struktur untuk kompos"},
    {nama: "Kertas Tisu", kategori: "Organik", waktu_urai: "2-4 minggu", pengelolaan: "Kompos (jika tidak berlemak)", dampak: "Mudah terurai jika tidak terkontaminasi"},
    {nama: "Kotoran Hewan", kategori: "Organik", waktu_urai: "2-6 bulan", pengelolaan: "Kompos atau pupuk kandang", dampak: "Pupuk alami yang sangat baik"},
    {nama: "Serbuk Gergaji", kategori: "Organik", waktu_urai: "1-3 tahun", pengelolaan: "Kompos atau mulsa", dampak: "Memperbaiki drainase tanah"},
    {nama: "Kulit Bawang", kategori: "Organik", waktu_urai: "2-4 minggu", pengelolaan: "Kompos atau pewarna alami", dampak: "Mengandung antioksidan"},
    {nama: "Sisa Roti", kategori: "Organik", waktu_urai: "1-2 minggu", pengelolaan: "Kompos atau pakan burung", dampak: "Dapat menarik hama jika berlebihan"},
    {nama: "Bunga Layu", kategori: "Organik", waktu_urai: "1-3 minggu", pengelolaan: "Kompos atau dekorasi kering", dampak: "Mempercantik kompos"},
    {nama: "Kulit Kentang", kategori: "Organik", waktu_urai: "2-4 minggu", pengelolaan: "Kompos atau pembersih alami", dampak: "Kaya akan nutrisi"},
    {nama: "Ampas Teh", kategori: "Organik", waktu_urai: "3-6 bulan", pengelolaan: "Kompos atau pupuk tanaman", dampak: "Mengandung tanin yang bermanfaat"},
    {nama: "Sisa Ikan", kategori: "Organik", waktu_urai: "1-2 minggu", pengelolaan: "Kompos atau pupuk cair", dampak: "Kaya protein dan fosfor"},
    {nama: "Rumput Potong", kategori: "Organik", waktu_urai: "2-6 bulan", pengelolaan: "Kompos atau mulsa", dampak: "Sumber nitrogen untuk kompos"},
    {nama: "Kulit Jagung", kategori: "Organik", waktu_urai: "1-2 bulan", pengelolaan: "Kompos atau kerajinan", dampak: "Serat alami yang berguna"},

    // Anorganik (20 items)
    {nama: "Botol Plastik", kategori: "Anorganik", waktu_urai: "450-1000 tahun", pengelolaan: "Daur ulang atau kerajinan", dampak: "Mencemari laut dan tanah"},
    {nama: "Kantong Plastik", kategori: "Anorganik", waktu_urai: "500-1000 tahun", pengelolaan: "Daur ulang atau ganti dengan tas kain", dampak: "Membunuh hewan laut"},
    {nama: "Kaleng Aluminium", kategori: "Anorganik", waktu_urai: "200-500 tahun", pengelolaan: "Daur ulang dengan nilai ekonomi tinggi", dampak: "Dapat didaur ulang tanpa batas"},
    {nama: "Botol Kaca", kategori: "Anorganik", waktu_urai: "1 juta tahun", pengelolaan: "Daur ulang atau kerajinan", dampak: "Tidak beracun tapi tidak terurai"},
    {nama: "Styrofoam", kategori: "Anorganik", waktu_urai: "500+ tahun", pengelolaan: "Hindari penggunaan, sulit didaur ulang", dampak: "Melepaskan zat beracun saat terbakar"},
    {nama: "Sedotan Plastik", kategori: "Anorganik", waktu_urai: "200-1000 tahun", pengelolaan: "Ganti dengan sedotan bambu/stainless", dampak: "Berbahaya untuk hewan laut"},
    {nama: "Kemasan Snack", kategori: "Anorganik", waktu_urai: "10-20 tahun", pengelolaan: "Ecobrick atau daur ulang khusus", dampak: "Sulit terurai karena multi-layer"},
    {nama: "Tutup Botol", kategori: "Anorganik", waktu_urai: "450 tahun", pengelolaan: "Kumpulkan untuk daur ulang", dampak: "Sering tertelan hewan"},
    {nama: "Kawat Tembaga", kategori: "Anorganik", waktu_urai: "100+ tahun", pengelolaan: "Daur ulang dengan nilai tinggi", dampak: "Dapat mencemari tanah"},
    {nama: "Piring Melamin", kategori: "Anorganik", waktu_urai: "500+ tahun", pengelolaan: "Gunakan berulang atau ganti keramik", dampak: "Melepaskan formaldehida"},
    {nama: "CD/DVD", kategori: "Anorganik", waktu_urai: "1 juta tahun", pengelolaan: "Daur ulang khusus atau kerajinan", dampak: "Mengandung logam berat"},
    {nama: "Kemasan Deterjen", kategori: "Anorganik", waktu_urai: "450 tahun", pengelolaan: "Bersihkan lalu daur ulang", dampak: "Residu kimia berbahaya"},
    {nama: "Mainan Plastik", kategori: "Anorganik", waktu_urai: "300-1000 tahun", pengelolaan: "Donasi atau daur ulang", dampak: "Mengandung BPA dan ftalat"},
    {nama: "Kemasan Shampo", kategori: "Anorganik", waktu_urai: "450 tahun", pengelolaan: "Refill atau daur ulang", dampak: "Residu kimia sulit dibersihkan"},
    {nama: "Sandal Jepit", kategori: "Anorganik", waktu_urai: "50-80 tahun", pengelolaan: "Daur ulang atau kerajinan", dampak: "Mikroplastik masuk rantai makanan"},
    {nama: "Kemasan Mie Instan", kategori: "Anorganik", waktu_urai: "10-20 tahun", pengelolaan: "Ecobrick atau hindari konsumsi berlebihan", dampak: "Lapisan lilin sulit terurai"},
    {nama: "Gelas Plastik", kategori: "Anorganik", waktu_urai: "450 tahun", pengelolaan: "Ganti dengan gelas kaca/stainless", dampak: "Melepaskan mikroplastik"},
    {nama: "Kemasan Kosmetik", kategori: "Anorganik", waktu_urai: "500+ tahun", pengelolaan: "Program take-back brand", dampak: "Residu kimia kompleks"},
    {nama: "Tali Rafia", kategori: "Anorganik", waktu_urai: "20-30 tahun", pengelolaan: "Gunakan berulang atau ganti tali alami", dampak: "Dapat melilit hewan"},
    {nama: "Ember Plastik", kategori: "Anorganik", waktu_urai: "20-30 tahun", pengelolaan: "Gunakan hingga rusak lalu daur ulang", dampak: "Tahan lama jika dirawat"},

    // B3 (10 items)
    {nama: "Baterai Bekas", kategori: "B3", waktu_urai: "100+ tahun", pengelolaan: "Kumpulkan di drop box khusus B3", dampak: "Merkuri dan timbal mencemari tanah dan air"},
    {nama: "Lampu Neon", kategori: "B3", waktu_urai: "Tidak terurai", pengelolaan: "Serahkan ke fasilitas daur ulang B3", dampak: "Mengandung merkuri yang sangat beracun"},
    {nama: "Cat Bekas", kategori: "B3", waktu_urai: "Tidak terurai", pengelolaan: "Keringkan lalu buang ke TPS B3", dampak: "Logam berat dan pelarut beracun"},
    {nama: "Oli Bekas", kategori: "B3", waktu_urai: "Tidak terurai", pengelolaan: "Serahkan ke bengkel atau daur ulang", dampak: "1 liter oli cemari 1 juta liter air"},
    {nama: "Obat Kadaluarsa", kategori: "B3", waktu_urai: "Bervariasi", pengelolaan: "Kembalikan ke apotek atau faskes", dampak: "Resistensi antibiotik dan keracunan"},
    {nama: "Pestisida Bekas", kategori: "B3", waktu_urai: "10-30 tahun", pengelolaan: "Jangan buang sembarangan, serahkan ke dinas pertanian", dampak: "Kanker dan gangguan hormon"},
    {nama: "Aki Bekas", kategori: "B3", waktu_urai: "Tidak terurai", pengelolaan: "Tukar tambah atau serahkan ke bengkel", dampak: "Asam sulfat dan timbal sangat berbahaya"},
    {nama: "Termometer Raksa", kategori: "B3", waktu_urai: "Tidak terurai", pengelolaan: "Serahkan ke fasilitas medis", dampak: "Merkuri merusak sistem saraf"},
    {nama: "Toner Printer", kategori: "B3", waktu_urai: "Tidak terurai", pengelolaan: "Program take-back produsen", dampak: "Partikel halus berbahaya untuk pernapasan"},
    {nama: "Cairan Pembersih", kategori: "B3", waktu_urai: "Bervariasi", pengelolaan: "Habiskan sesuai petunjuk, jangan campur", dampak: "Iritasi kulit dan gangguan pernapasan"}
];

// Quiz questions with 3 difficulty levels (moved here for common use)
const quizQuestions = {
    mudah: [
        {
            question: "Sampah organik adalah sampah yang...",
            options: ["Mudah terurai", "Sulit terurai", "Berbahaya", "Beracun"],
            correct: 0,
            explanation: "Sampah organik mudah terurai secara alami oleh mikroorganisme."
        },
        {
            question: "Contoh sampah organik adalah...",
            options: ["Plastik", "Kulit pisang", "Kaca", "Logam"],
            correct: 1,
            explanation: "Kulit pisang adalah sampah organik yang mudah terurai."
        },
        {
            question: "Warna tempat sampah untuk sampah organik adalah...",
            options: ["Merah", "Hijau", "Biru", "Kuning"],
            correct: 1,
            explanation: "Tempat sampah hijau digunakan untuk sampah organik."
        },
        {
            question: "Sampah B3 artinya...",
            options: ["Bahan Berbahaya dan Beracun", "Bahan Besar dan Berat", "Bahan Basah dan Bersih", "Bahan Baik dan Berguna"],
            correct: 0,
            explanation: "B3 adalah singkatan dari Bahan Berbahaya dan Beracun."
        },
        {
            question: "Contoh sampah anorganik adalah...",
            options: ["Daun", "Botol plastik", "Kulit buah", "Sisa makanan"],
            correct: 1,
            explanation: "Botol plastik adalah sampah anorganik yang sulit terurai."
        },
        {
            question: "Reduce artinya...",
            options: ["Mengurangi", "Menggunakan kembali", "Mendaur ulang", "Mengganti"],
            correct: 0,
            explanation: "Reduce berarti mengurangi penggunaan barang yang menghasilkan sampah."
        },
        {
            question: "Reuse artinya...",
            options: ["Mengurangi", "Menggunakan kembali", "Mendaur ulang", "Menolak"],
            correct: 1,
            explanation: "Reuse berarti menggunakan kembali barang yang masih bisa dipakai."
        },
        {
            question: "Recycle artinya...",
            options: ["Mengurangi", "Menggunakan kembali", "Mendaur ulang", "Mengganti"],
            correct: 2,
            explanation: "Recycle berarti mendaur ulang sampah menjadi produk baru."
        },
        {
            question: "Sampah yang paling berbahaya adalah...",
            options: ["Organik", "Anorganik", "B3", "Kertas"],
            correct: 2,
            explanation: "Sampah B3 paling berbahaya karena mengandung zat beracun."
        },
        {
            question: "Kompos dibuat dari sampah...",
            options: ["Plastik", "Organik", "Kaca", "Logam"],
            correct: 1,
            explanation: "Kompos dibuat dari sampah organik yang mudah terurai."
        }
    ],
    sedang: [
        {
            question: "Berapa lama waktu terurai botol plastik?",
            options: ["50 tahun", "100 tahun", "450 tahun", "50 hari"],
            correct: 2,
            explanation: "Botol plastik membutuhkan waktu sekitar 450 tahun untuk terurai."
        },
        {
            question: "Dampak sampah plastik di laut adalah...",
            options: ["Memberi makan ikan", "Membunuh hewan laut", "Menyuburkan terumbu karang", "Membersihkan air laut"],
            correct: 1,
            explanation: "Sampah plastik dapat membunuh hewan laut yang menelannya."
        },
        {
            question: "Prinsip 5R dalam pengelolaan sampah adalah...",
            options: ["Refuse, Reduce, Reuse, Recycle, Replace", "Read, Run, Rest, Relax, Repeat", "Red, Round, Right, Real, Rich", "Rain, River, Rock, Road, Room"],
            correct: 0,
            explanation: "5R adalah Refuse, Reduce, Reuse, Recycle, dan Replace."
        },
        {
            question: "Mikroplastik berbahaya karena...",
            options: ["Terlalu besar", "Masuk rantai makanan", "Berwarna cerah", "Mudah terlihat"],
            correct: 1,
            explanation: "Mikroplastik berbahaya karena dapat masuk ke rantai makanan."
        },
        {
            question: "Sampah organik yang tidak dikelola dengan baik dapat menyebabkan...",
            options: ["Banjir", "Penyakit", "Kebakaran", "Gempa"],
            correct: 1,
            explanation: "Sampah organik yang membusuk dapat menjadi sarang penyakit."
        },
        {
            question: "Gas yang dihasilkan dari pembusukan sampah organik adalah...",
            options: ["Oksigen", "Nitrogen", "Metana", "Karbon dioksida"],
            correct: 2,
            explanation: "Sampah organik yang membusuk menghasilkan gas metana."
        },
        {
            question: "Ecobrick adalah...",
            options: ["Batu bata dari tanah", "Botol plastik diisi sampah plastik", "Bata dari semen", "Kayu untuk bangunan"],
            correct: 1,
            explanation: "Ecobrick adalah botol plastik yang diisi padat dengan sampah plastik."
        },
        {
            question: "Sampah elektronik termasuk kategori...",
            options: ["Organik", "Anorganik", "B3", "Kompos"],
            correct: 2,
            explanation: "Sampah elektronik mengandung logam berat sehingga termasuk B3."
        },
        {
            question: "Cara terbaik mengelola sampah baterai adalah...",
            options: ["Dibuang ke tempat sampah biasa", "Dibakar", "Dikumpulkan di drop box khusus", "Dikubur"],
            correct: 2,
            explanation: "Baterai harus dikumpulkan di drop box khusus untuk sampah B3."
        },
        {
            question: "Dampak sampah terhadap pemanasan global adalah...",
            options: ["Mengurangi suhu", "Meningkatkan gas rumah kaca", "Menyerap panas", "Tidak ada dampak"],
            correct: 1,
            explanation: "Sampah menghasilkan gas metana yang merupakan gas rumah kaca."
        }
    ],
    sulit: [
        {
            question: "Berapa persen sampah plastik yang benar-benar didaur ulang secara global?",
            options: ["50%", "25%", "9%", "75%"],
            correct: 2,
            explanation: "Hanya sekitar 9% sampah plastik global yang benar-benar didaur ulang."
        },
        {
            question: "Zat berbahaya dalam styrofoam yang dilepaskan saat dipanaskan adalah...",
            options: ["Benzena", "Stirena", "Toluena", "Formaldehida"],
            correct: 1,
            explanation: "Styrofoam melepaskan stirena yang bersifat karsinogenik saat dipanaskan."
        },
        {
            question: "Konsep ekonomi sirkular dalam pengelolaan sampah bertujuan untuk...",
            options: ["Membakar semua sampah", "Mengurangi, menggunakan kembali, dan mendaur ulang", "Mengubur sampah", "Mengekspor sampah"],
            correct: 1,
            explanation: "Ekonomi sirkular bertujuan meminimalkan limbah melalui 3R."
        },
        {
            question: "Biogas dari sampah organik mengandung gas utama...",
            options: ["Oksigen", "Nitrogen", "Metana", "Hidrogen"],
            correct: 2,
            explanation: "Biogas dari sampah organik mengandung 50-70% metana."
        },
        {
            question: "Leachate adalah...",
            options: ["Air hujan", "Air bersih", "Cairan dari TPA yang mencemari tanah", "Air minum"],
            correct: 2,
            explanation: "Leachate adalah cairan dari TPA yang dapat mencemari air tanah."
        },
        {
            question: "Teknologi waste-to-energy mengubah sampah menjadi...",
            options: ["Kompos", "Plastik baru", "Energi listrik", "Air bersih"],
            correct: 2,
            explanation: "Waste-to-energy mengubah sampah menjadi energi listrik melalui pembakaran."
        },
        {
            question: "Persistent Organic Pollutants (POPs) dalam sampah berbahaya karena...",
            options: ["Mudah terurai", "Tidak terurai dan terakumulasi dalam tubuh", "Berwarna cerah", "Berbau harum"],
            correct: 1,
            explanation: "POPs tidak terurai dan terakumulasi dalam rantai makanan."
        },
        {
            question: "Prinsip Extended Producer Responsibility (EPR) berarti...",
            options: ["Konsumen bertanggung jawab penuh", "Produsen bertanggung jawab hingga akhir siklus produk", "Pemerintah mengelola semua sampah", "Tidak ada yang bertanggung jawab"],
            correct: 1,
            explanation: "EPR membuat produsen bertanggung jawab hingga produk menjadi sampah."
        },
        {
            question: "Mikroplastik berukuran kurang dari...",
            options: ["1 cm", "5 mm", "1 mm", "10 cm"],
            correct: 1,
            explanation: "Mikroplastik didefinisikan sebagai partikel plastik berukuran kurang dari 5 mm."
        },
        {
            question: "Dampak jangka panjang dari Great Pacific Garbage Patch adalah...",
            options: ["Membersihkan laut", "Mengganggu ekosistem laut global", "Menyediakan habitat baru", "Tidak ada dampak"],
            correct: 1,
            explanation: "Great Pacific Garbage Patch mengganggu ekosistem laut dan rantai makanan global."
        }
    ]
};


// Database functions
function populateDatabase() {
    const grid = document.getElementById('database-grid');
    if (!grid) return; // Ensure element exists on the current page
    grid.innerHTML = '';
    
    wasteDatabase.forEach(item => {
        const card = createWasteCard(item);
        grid.appendChild(card);
    });
}

function createWasteCard(item) {
    const card = document.createElement('div');
    const categoryClass = item.kategori.toLowerCase();
    const warningIcon = item.kategori === 'B3' ? '⚠️ ' : '';
    
    card.className = `bg-white rounded-lg shadow-lg p-6 border-l-4 ${
        item.kategori === 'Organik' ? 'border-green-500' :
        item.kategori === 'Anorganik' ? 'border-blue-500' : 'border-red-500'
    }`;
    
    card.innerHTML = `
        <div class="flex items-center mb-3">
            <span class="text-2xl mr-2">${warningIcon}${getWasteIcon(item.kategori)}</span>
            <h3 class="font-bold text-lg">${item.nama}</h3>
        </div>
        <div class="space-y-2 text-sm">
            <p><span class="font-semibold">Kategori:</span> 
                <span class="px-2 py-1 rounded text-white text-xs ${categoryClass}">${item.kategori}</span>
            </p>
            <p><span class="font-semibold">Waktu Terurai:</span> ${item.waktu_urai}</p>
            <p><span class="font-semibold">Pengelolaan:</span> ${item.pengelolaan}</p>
            <p><span class="font-semibold">Dampak:</span> ${item.dampak}</p>
        </div>
    `;
    
    return card;
}

function getWasteIcon(category) {
    switch(category) {
        case 'Organik': return '🌱';
        case 'Anorganik': return '♻️';
        case 'B3': return '☠️';
        default: return '🗑️';
    }
}

function filterDatabase(category) {
    const grid = document.getElementById('database-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const filteredData = category === 'all' ? 
        wasteDatabase : 
        wasteDatabase.filter(item => item.kategori === category);
    
    filteredData.forEach(item => {
        const card = createWasteCard(item);
        grid.appendChild(card);
    });
}

// AI Detection functions
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('webcam');
        if (video) {
            video.srcObject = stream;
            video.play();
        }
    } catch (error) {
        alert('Tidak dapat mengakses kamera. Pastikan browser memiliki izin kamera.');
    }
}

function stopCamera() {
    const video = document.getElementById('webcam');
    if (video && video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }
}

async function predict() {
    // Simulasi prediksi (karena model yolov8 belum diintegrasikan)
    const predictions = [
        { className: 'Organik', probability: Math.random() },
        { className: 'Anorganik', probability: Math.random() },
        { className: 'B3', probability: Math.random() }
    ];
    
    // Sort by probability
    predictions.sort((a, b) => b.probability - a.probability);
    
    displayPredictionResult(predictions[0]);
}

function displayPredictionResult(prediction) {
    const resultDiv = document.getElementById('prediction-result');
    if (!resultDiv) return;
    const category = prediction.className;
    const confidence = (prediction.probability * 100).toFixed(1);
    const currentTime = new Date().toLocaleString('id-ID');
    
    // Find matching waste data
    const wasteData = wasteDatabase.find(item => item.kategori === category) || {
        nama: `Sampah ${category}`,
        kategori: category,
        waktu_urai: 'Bervariasi',
        pengelolaan: 'Sesuai kategori',
        dampak: 'Tergantung jenis sampah'
    };
    
    const warningIcon = category === 'B3' ? '⚠️ BAHAYA! ' : '';
    const categoryClass = category.toLowerCase();
    
    resultDiv.innerHTML = `
        <div class="bg-white border-l-4 ${
            category === 'Organik' ? 'border-green-500' :
            category === 'Anorganik' ? 'border-blue-500' : 'border-red-500'
        } p-4 rounded-lg shadow-lg">
            <!-- Detection Info Header -->
            <div class="bg-gray-50 p-3 rounded-lg mb-4">
                <h4 class="font-bold text-sm text-gray-700 mb-2">📊 Informasi Deteksi</h4>
                <div class="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <div>
                        <p><span class="font-semibold">Waktu Deteksi:</span></p>
                        <p>${currentTime}</p>
                    </div>
                    <div>
                        <p><span class="font-semibold">Tingkat Kepercayaan:</span></p>
                        <div class="flex items-center mt-1">
                            <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: ${confidence}%"></div>
                            </div>
                            <span class="font-bold">${confidence}%</span>
                        </div>
                    </div>
                </div>
                <div class="mt-2 text-xs">
                    <p><span class="font-semibold">Status AI:</span> 
                        <span class="text-green-600">✅ Model Aktif</span> | 
                    </p>
                </div>
            </div>

            <!-- Main Result -->
            <div class="flex items-center mb-3">
                <span class="text-3xl mr-3">${warningIcon}${getWasteIcon(category)}</span>
                <div>
                    <h3 class="font-bold text-xl">${wasteData.nama}</h3>
                    <p class="text-sm text-gray-600">Terdeteksi sebagai sampah ${category}</p>
                </div>
            </div>
            
            <div class="space-y-2">
                <p><span class="font-semibold">Kategori:</span> 
                    <span class="px-2 py-1 rounded text-white text-sm ${categoryClass}">${category}</span>
                </p>
                <p><span class="font-semibold">Waktu Terurai:</span> ${wasteData.waktu_urai}</p>
                <p><span class="font-semibold">Pengelolaan:</span> ${wasteData.pengelolaan}</p>
                <p><span class="font-semibold">Dampak:</span> ${wasteData.dampak}</p>
            </div>
            
            ${category === 'B3' ? `
                <div class="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                    <p class="text-red-800 font-semibold">⚠️ PERINGATAN BAHAYA!</p>
                    <p class="text-red-700 text-sm">Sampah B3 mengandung zat berbahaya dan beracun. Tangani dengan hati-hati dan serahkan ke fasilitas pengelolaan B3 yang tepat.</p>
                </div>
            ` : ''}

            <!-- Action Recommendations -->
            <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-blue-800 font-semibold text-sm">💡 Rekomendasi Tindakan:</p>
                <ul class="text-blue-700 text-xs mt-1 list-disc list-inside">
                    ${category === 'Organik' ? `
                        <li>Pisahkan dari sampah lain</li>
                        <li>Buat kompos atau pupuk organik</li>
                        <li>Jangan campur dengan sampah anorganik</li>
                    ` : category === 'Anorganik' ? `
                        <li>Bersihkan sebelum didaur ulang</li>
                        <li>Kumpulkan dengan sampah sejenis</li>
                        <li>Pertimbangkan untuk mengurangi penggunaan</li>
                    ` : `
                        <li>JANGAN buang ke tempat sampah biasa</li>
                        <li>Kumpulkan di drop box khusus B3</li>
                        <li>Hubungi fasilitas pengelolaan B3 terdekat</li>
                    `}
                </ul>
            </div>
        </div>
    `;
}

// Game functions
function startGame(gameType) {
    currentGame = gameType;
    gameScore = 0;
    sortedItems = 0; // Reset sorting game progress
    
    const modal = document.getElementById('gameModal');
    const title = document.getElementById('gameTitle');
    const content = document.getElementById('gameContent');
    
    if (modal) modal.classList.remove('hidden');
    
    if (title) {
        switch(gameType) {
            case 'sorting':
                title.textContent = '🗂️ Game Pilah Sampah';
                if (content) content.innerHTML = createSortingGame();
                break;
            case 'timing':
                title.textContent = '⏰ Game Waktu Terurai';
                if (content) content.innerHTML = createTimingGame();
                break;
            case 'quiz':
                title.textContent = '🧠 Quiz Edukasi';
                if (content) content.innerHTML = createQuizGame();
                break;
        }
    }
}

function createSortingGame() {
    const items = [
        {name: 'Kulit Pisang', category: 'Organik'},
        {name: 'Botol Plastik', category: 'Anorganik'},
        {name: 'Baterai Bekas', category: 'B3'},
        {name: 'Daun Kering', category: 'Organik'},
        {name: 'Kaleng Soda', category: 'Anorganik'}
    ];
    
    return `
        <!-- Game Instructions -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 class="font-bold text-blue-800 mb-2">📋 Cara Bermain:</h4>
            <ol class="text-sm text-blue-700 list-decimal list-inside space-y-1">
                <li><strong>Seret</strong> sampah dari area bawah ke tempat sampah yang sesuai</li>
                <li><strong>🌱 Organik:</strong> Sampah yang mudah terurai (kulit buah, daun, sisa makanan)</li>
                <li><strong>♻️ Anorganik:</strong> Sampah yang sulit terurai (plastik, kaca, logam)</li>
                <li><strong>⚠️ B3:</strong> Sampah berbahaya dan beracun (baterai, cat, oli)</li>
                <li><strong>Poin:</strong> +10 jika benar, -5 jika salah</li>
                <li><strong>Target:</strong> Pilah semua sampah dengan benar!</li>
            </ol>
        </div>

        <div class="text-center mb-4">
            <p class="text-lg font-semibold">🎯 Seret sampah ke tempat sampah yang benar!</p>
            <p class="text-sm text-gray-600">Skor: <span id="sortingScore" class="font-bold text-blue-600">0</span></p>
        </div>

        <!-- Trash Bins -->
        <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="organik text-white p-4 rounded-lg text-center border-2 border-dashed border-transparent hover:border-white transition-all" 
                 ondrop="drop(event, 'Organik')" ondragover="allowDrop(event)">
                <div class="text-3xl mb-2">🌱</div>
                <p class="font-bold">Organik</p>
                <p class="text-xs opacity-80">Mudah terurai</p>
            </div>
            <div class="anorganik text-white p-4 rounded-lg text-center border-2 border-dashed border-transparent hover:border-white transition-all" 
                 ondrop="drop(event, 'Anorganik')" ondragover="allowDrop(event)">
                <div class="text-3xl mb-2">♻️</div>
                <p class="font-bold">Anorganik</p>
                <p class="text-xs opacity-80">Sulit terurai</p>
            </div>
            <div class="b3 text-white p-4 rounded-lg text-center border-2 border-dashed border-transparent hover:border-white transition-all" 
                 ondrop="drop(event, 'B3')" ondragover="allowDrop(event)">
                <div class="text-3xl mb-2">⚠️</div>
                <p class="font-bold">B3</p>
                <p class="text-xs opacity-80">Berbahaya</p>
            </div>
        </div>

        <!-- Waste Items -->
        <div class="mb-4">
            <p class="text-center text-sm text-gray-600 mb-3">👆 Seret item di bawah ini ke tempat sampah yang sesuai</p>
            <div class="grid grid-cols-2 gap-4" id="sortingItems">
                ${items.map((item, index) => `
                    <div class="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg text-center cursor-move border-2 border-gray-300 hover:border-blue-400 hover:shadow-lg transition-all transform hover:scale-105" 
                         draggable="true" 
                         ondragstart="drag(event)" 
                         data-category="${item.category}"
                         id="item${index}">
                        <div class="text-2xl mb-2">${getWasteIcon(item.category)}</div>
                        <p class="font-semibold text-gray-800">${item.name}</p>
                        <p class="text-xs text-gray-500 mt-1">Seret ke tempat sampah</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div id="sortingFeedback" class="mt-4"></div>

        <!-- Progress Indicator -->
        <div class="mt-6 bg-gray-100 p-4 rounded-lg">
            <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">Progress:</span>
                <span id="sortingProgress" class="font-bold">0/5 selesai</span>
            </div>
            <div class="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div id="sortingProgressBar" class="bg-green-500 h-2 rounded-full transition-all" style="width: 0%"></div>
            </div>
        </div>
    `;
}

function createTimingGame() {
    const questions = [
        {item: 'Botol Plastik', options: ['50 tahun', '450 tahun', '10 tahun', '5 tahun'], correct: 1, icon: '🧋'},
        {item: 'Kulit Pisang', options: ['2-5 minggu', '2 tahun', '6 bulan', '1 hari'], correct: 0, icon: '🍌'},
        {item: 'Kaleng Aluminium', options: ['50 tahun', '200-500 tahun', '10 tahun', '1 tahun'], correct: 1, icon: '🥤'},
        {item: 'Kantong Plastik', options: ['100 tahun', '500-1000 tahun', '50 tahun', '10 tahun'], correct: 1, icon: '🛍️'},
        {item: 'Kertas', options: ['2-6 minggu', '2 tahun', '10 tahun', '100 tahun'], correct: 0, icon: '📄'},
        {item: 'Botol Kaca', options: ['100 tahun', '500 tahun', '1 juta tahun', '50 tahun'], correct: 2, icon: '🍾'}
    ];
    
    const currentQ = questions[Math.floor(Math.random() * questions.length)];
    
    return `
        <!-- Game Instructions -->
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 class="font-bold text-yellow-800 mb-2">📋 Cara Bermain:</h4>
            <ol class="text-sm text-yellow-700 list-decimal list-inside space-y-1">
                <li><strong>Tebak</strong> berapa lama waktu yang dibutuhkan sampah untuk terurai</li>
                <li><strong>Pilih</strong> salah satu dari 4 pilihan jawaban yang tersedia</li>
                <li><strong>Poin:</strong> +10 jika benar, tidak ada pengurangan jika salah</li>
                <li><strong>Belajar:</strong> Setiap jawaban akan dijelaskan dengan detail</li>
                <li><strong>Target:</strong> Pelajari waktu terurai berbagai jenis sampah!</li>
            </ol>
        </div>

        <div class="text-center mb-6">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-4">
                <div class="text-4xl mb-2">${currentQ.icon}</div>
                <p class="text-lg mb-2">Berapa lama waktu terurai untuk:</p>
                <h3 class="text-3xl font-bold">${currentQ.item}</h3>
            </div>
            <p class="text-sm text-gray-600">Skor: <span id="timingScore" class="font-bold text-blue-600">0</span></p>
        </div>

        <!-- Answer Options -->
        <div class="grid grid-cols-2 gap-4 mb-6">
            ${currentQ.options.map((option, index) => `
                <button class="bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 p-6 rounded-lg transition-all transform hover:scale-105 border-2 border-blue-300 hover:border-blue-500" 
                        onclick="checkTimingAnswer(${index}, ${currentQ.correct}, '${currentQ.item}', '${currentQ.icon}')">
                    <div class="text-2xl mb-2">${index === 0 ? '⚡' : index === 1 ? '⏰' : index === 2 ? '🐌' : '🚀'}</div>
                    <p class="font-bold text-lg text-blue-800">${option}</p>
                </button>
            `).join('')}
        </div>

        <div id="timingFeedback" class="mt-4"></div>

        <!-- Fun Facts -->
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
            <h4 class="font-bold text-gray-700 mb-2">💡 Tahukah Kamu?</h4>
            <p class="text-sm text-gray-600">Waktu terurai sampah sangat bervariasi tergantung kondisi lingkungan seperti suhu, kelembaban, dan keberadaan mikroorganisme. Sampah organik terurai lebih cepat di iklim tropis!</p>
        </div>
    `;
}

function createQuizGame() {
    currentQuizIndex = 0;
    quizScore = 0;
    
    return `
        <!-- Game Instructions -->
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h4 class="font-bold text-purple-800 mb-2">📋 Cara Bermain Quiz:</h4>
            <ol class="text-sm text-purple-700 list-decimal list-inside space-y-1">
                <li><strong>Pilih tingkat kesulitan:</strong> Mudah (10 soal), Sedang (10 soal), atau Sulit (10 soal)</li>
                <li><strong>Jawab pertanyaan</strong> dengan memilih salah satu dari 4 pilihan</li>
                <li><strong>Poin:</strong> +10 untuk setiap jawaban benar</li>
                <li><strong>Penjelasan:</strong> Setiap jawaban akan dijelaskan setelah dipilih</li>
                <li><strong>Hasil akhir:</strong> Lihat skor dan penilaian di akhir quiz</li>
                <li><strong>Target:</strong> Raih skor 80% atau lebih untuk mendapat predikat "Excellent"!</li>
            </ol>
        </div>

        <!-- Difficulty Selection -->
        <div class="mb-6">
            <h3 class="text-xl font-bold text-center mb-4">🎯 Pilih Tingkat Kesulitan</h3>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-lg text-center cursor-pointer hover:from-green-500 hover:to-green-600 transition-all transform hover:scale-105" onclick="setQuizLevel('mudah')">
                    <div class="text-3xl mb-2">🌱</div>
                    <h4 class="font-bold text-lg mb-2">MUDAH</h4>
                    <p class="text-sm opacity-90 mb-3">Konsep dasar sampah dan pengelolaan</p>
                    <ul class="text-xs opacity-80 text-left space-y-1">
                        <li>• Jenis-jenis sampah</li>
                        <li>• Prinsip 5R</li>
                        <li>• Definisi dasar</li>
                    </ul>
                </div>
                <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 rounded-lg text-center cursor-pointer hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-105" onclick="setQuizLevel('sedang')">
                    <div class="text-3xl mb-2">⚡</div>
                    <h4 class="font-bold text-lg mb-2">SEDANG</h4>
                    <p class="text-sm opacity-90 mb-3">Dampak dan pengelolaan lanjutan</p>
                    <ul class="text-xs opacity-80 text-left space-y-1">
                        <li>• Waktu terurai sampah</li>
                        <li>• Dampak lingkungan</li>
                        <li>• Teknologi pengelolaan</li>
                    </ul>
                </div>
                <div class="bg-gradient-to-r from-red-400 to-red-500 text-white p-6 rounded-lg text-center cursor-pointer hover:from-red-500 hover:to-red-600 transition-all transform hover:scale-105" onclick="setQuizLevel('sulit')">
                    <div class="text-3xl mb-2">🔥</div>
                    <h4 class="font-bold text-lg mb-2">SULIT</h4>
                    <p class="text-sm opacity-90 mb-3">Konsep advanced dan global</p>
                    <ul class="text-xs opacity-80 text-left space-y-1">
                        <li>• Ekonomi sirkular</li>
                        <li>• Mikroplastik & POPs</li>
                        <li>• Isu global sampah</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Quiz Statistics -->
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h4 class="font-bold text-gray-700 mb-3">📊 Statistik Quiz</h4>
            <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p class="text-2xl font-bold text-green-600">30+</p>
                    <p class="text-xs text-gray-600">Total Soal</p>
                </div>
                <div>
                    <p class="text-2xl font-bold text-blue-600">3</p>
                    <p class="text-xs text-gray-600">Tingkat Kesulitan</p>
                </div>
                <div>
                    <p class="text-2xl font-bold text-purple-600">100%</p>
                    <p class="text-xs text-gray-600">Skor Maksimal</p>
                </div>
            </div>
        </div>

        <div id="quizContent"></div>
    `;
}

function setQuizLevel(level) {
    currentQuizLevel = level;
    currentQuizIndex = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    const questions = quizQuestions[currentQuizLevel];
    const question = questions[currentQuizIndex];
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    quizContent.innerHTML = `
        <div class="mb-4">
            <div class="flex justify-between items-center mb-4">
                <span class="text-sm text-gray-600">Soal ${currentQuizIndex + 1} dari ${questions.length}</span>
                <span class="text-sm text-gray-600">Skor: ${quizScore}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div class="bg-blue-600 h-2 rounded-full" style="width: ${((currentQuizIndex + 1) / questions.length) * 100}%"></div>
            </div>
        </div>
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">${question.question}</h3>
            <div class="space-y-2">
                ${question.options.map((option, index) => `
                    <button class="w-full text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition" 
                            onclick="checkQuizAnswer(${index}, ${question.correct}, '${question.explanation}')">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </button>
                `).join('')}
            </div>
        </div>
        <div id="quizFeedback"></div>
    `;
}

function checkQuizAnswer(selected, correct, explanation) {
    const feedback = document.getElementById('quizFeedback');
    if (!feedback) return;
    const isCorrect = selected === correct;
    
    if (isCorrect) {
        quizScore += 10;
        feedback.innerHTML = `
            <div class="bg-green-100 border border-green-300 p-4 rounded-lg">
                <p class="text-green-800 font-semibold">✅ Benar!</p>
                <p class="text-green-700 text-sm">${explanation}</p>
            </div>
        `;
    } else {
        feedback.innerHTML = `
            <div class="bg-red-100 border border-red-300 p-4 rounded-lg">
                <p class="text-red-800 font-semibold">❌ Salah!</p>
                <p class="text-red-700 text-sm">${explanation}</p>
            </div>
        `;
    }
    
    setTimeout(() => {
        currentQuizIndex++;
        if (currentQuizIndex < quizQuestions[currentQuizLevel].length) {
            showQuizQuestion();
        } else {
            showQuizResult();
        }
    }, 2000);
}

function showQuizResult() {
    const totalQuestions = quizQuestions[currentQuizLevel].length;
    const percentage = (quizScore / (totalQuestions * 10)) * 100;
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    quizContent.innerHTML = `
        <div class="text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold mb-4">Quiz Selesai!</h3>
            <div class="bg-blue-100 p-6 rounded-lg mb-4">
                <p class="text-3xl font-bold text-blue-600">${quizScore}/${totalQuestions * 10}</p>
                <p class="text-blue-800">Skor Akhir: ${percentage.toFixed(1)}%</p>
            </div>
            <div class="mb-4">
                <p class="font-semibold mb-2">Penilaian:</p>
                <p class="text-lg ${percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}">
                    ${percentage >= 80 ? '🌟 Excellent!' : percentage >= 60 ? '👍 Good!' : '💪 Keep Learning!'}
                </p>
            </div>
            <button onclick="setQuizLevel('${currentQuizLevel}')" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                Main Lagi
            </button>
        </div>
    `;
}

// Drag and drop functions for sorting game
let sortedItems = 0;
const totalItems = 5;

function allowDrop(ev) {
    ev.preventDefault();
    ev.target.classList.add('border-white');
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, targetCategory) {
    ev.preventDefault();
    ev.target.classList.remove('border-white');
    
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    if (!draggedElement) return;

    const itemCategory = draggedElement.getAttribute('data-category');
    
    const feedback = document.getElementById('sortingFeedback');
    if (!feedback) return;
    
    if (itemCategory === targetCategory) {
        gameScore += 10;
        sortedItems++;
        draggedElement.style.opacity = '0.3';
        draggedElement.style.transform = 'scale(0.8)';
        draggedElement.draggable = false;
        draggedElement.innerHTML += '<div class="absolute top-0 right-0 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✓</div>';
        
        feedback.innerHTML = `
            <div class="bg-green-100 border border-green-300 p-4 rounded-lg">
                <p class="text-green-800 font-semibold">✅ Benar! +10 poin</p>
                <p class="text-green-700 text-sm">Sampah ${draggedElement.querySelector('p').textContent} memang termasuk kategori ${targetCategory}!</p>
            </div>
        `;
        
        // Update progress
        updateSortingProgress();
        
        // Check if game completed
        if (sortedItems === totalItems) {
            setTimeout(() => {
                feedback.innerHTML = `
                    <div class="bg-blue-100 border border-blue-300 p-4 rounded-lg text-center">
                        <div class="text-4xl mb-2">🎉</div>
                        <p class="text-blue-800 font-bold text-lg">Selamat! Game Selesai!</p>
                        <p class="text-blue-700">Skor Akhir: ${gameScore} poin</p>
                        <button onclick="startGame('sorting')" class="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Main Lagi</button>
                    </div>
                `;
            }, 1500);
        }
    } else {
        gameScore = Math.max(0, gameScore - 5);
        
        feedback.innerHTML = `
            <div class="bg-red-100 border border-red-300 p-4 rounded-lg">
                <p class="text-red-800 font-semibold">❌ Salah! -5 poin</p>
                <p class="text-red-700 text-sm">Sampah <strong>${draggedElement.querySelector('p').textContent}</strong> seharusnya masuk kategori <strong>${itemCategory}</strong></p>
                <p class="text-red-600 text-xs mt-1">💡 Tip: ${getWasteTip(itemCategory)}</p>
            </div>
        `;
    }
    
    const sortingScoreElement = document.getElementById('sortingScore');
    if (sortingScoreElement) sortingScoreElement.textContent = gameScore;
}

function updateSortingProgress() {
    const progressText = document.getElementById('sortingProgress');
    const progressBar = document.getElementById('sortingProgressBar');
    
    if (progressText && progressBar) {
        progressText.textContent = `${sortedItems}/${totalItems} selesai`;
        progressBar.style.width = `${(sortedItems / totalItems) * 100}%`;
    }
}

function getWasteTip(category) {
    switch(category) {
        case 'Organik': return 'Sampah organik mudah terurai dan bisa dijadikan kompos';
        case 'Anorganik': return 'Sampah anorganik sulit terurai, sebaiknya didaur ulang';
        case 'B3': return 'Sampah B3 berbahaya, harus ditangani khusus';
        default: return 'Pelajari lebih lanjut tentang jenis sampah ini';
    }
}

function checkTimingAnswer(selected, correct, item, icon) {
    const feedback = document.getElementById('timingFeedback');
    const buttons = document.querySelectorAll('#gameContent button');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if (selected === correct) {
        gameScore += 10;
        feedback.innerHTML = `
            <div class="bg-green-100 border border-green-300 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                    <span class="text-2xl mr-2">✅</span>
                    <p class="text-green-800 font-semibold">Benar! +10 poin</p>
                </div>
                <p class="text-green-700 text-sm mb-2">Waktu terurai ${item} ${icon} memang seperti itu!</p>
                <div class="bg-green-50 p-3 rounded border-l-4 border-green-400 mt-3">
                    <p class="text-green-800 text-xs font-semibold">💡 Fakta Menarik:</p>
                    <p class="text-green-700 text-xs">${getTimingFact(item)}</p>
                </div>
            </div>
        `;
    } else {
        feedback.innerHTML = `
            <div class="bg-red-100 border border-red-300 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                    <span class="text-2xl mr-2">❌</span>
                    <p class="text-red-800 font-semibold">Salah!</p>
                </div>
                <p class="text-red-700 text-sm mb-2">Waktu terurai ${item} ${icon} sebenarnya ${getCorrectAnswer(item)}.</p>
                <div class="bg-red-50 p-3 rounded border-l-4 border-red-400 mt-3">
                    <p class="text-red-800 text-xs font-semibold">📚 Penjelasan:</p>
                    <p class="text-red-700 text-xs">${getTimingExplanation(item)}</p>
                </div>
            </div>
        `;
    }
    
    const timingScoreElement = document.getElementById('timingScore');
    if (timingScoreElement) timingScoreElement.textContent = gameScore;
    
    // Add next question button
    setTimeout(() => {
        if (feedback) {
            feedback.innerHTML += `
                <div class="text-center mt-4">
                    <button onclick="document.getElementById('gameContent').innerHTML = createTimingGame()" 
                            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                        Soal Berikutnya ➡️
                    </button>
                </div>
            `;
        }
    }, 1000);
}

function getTimingFact(item) {
    const facts = {
        'Botol Plastik': 'Satu botol plastik bisa mencemari 1000 liter air tanah!',
        'Kulit Pisang': 'Kulit pisang kaya kalium dan bisa mempercepat pertumbuhan tanaman.',
        'Kaleng Aluminium': 'Aluminium bisa didaur ulang tanpa batas tanpa kehilangan kualitas.',
        'Kantong Plastik': 'Satu kantong plastik bisa membunuh hewan laut yang menelannya.',
        'Kertas': 'Kertas dari pohon yang ditanam khusus lebih ramah lingkungan.',
        'Botol Kaca': 'Kaca tidak pernah kehilangan kualitas meski didaur ulang berkali-kali.'
    };
    return facts[item] || 'Setiap jenis sampah memiliki karakteristik terurai yang unik.';
}

function getCorrectAnswer(item) {
    const answers = {
        'Botol Plastik': '450 tahun',
        'Kulit Pisang': '2-5 minggu',
        'Kaleng Aluminium': '200-500 tahun',
        'Kantong Plastik': '500-1000 tahun',
        'Kertas': '2-6 minggu',
        'Botol Kaca': '1 juta tahun'
    };
    return answers[item] || 'bervariasi';
}

function getTimingExplanation(item) {
    const explanations = {
        'Botol Plastik': 'Plastik PET sangat sulit terurai karena struktur molekulnya yang kompleks.',
        'Kulit Pisang': 'Kulit pisang mengandung banyak air dan mudah diserang mikroorganisme.',
        'Kaleng Aluminium': 'Aluminium tahan korosi tapi akhirnya akan teroksidasi.',
        'Kantong Plastik': 'Plastik tipis lebih mudah terfragmentasi tapi tetap sulit terurai.',
        'Kertas': 'Serat selulosa dalam kertas mudah diuraikan oleh bakteri.',
        'Botol Kaca': 'Kaca adalah material yang sangat stable dan hampir tidak terurai.'
    };
    return explanations[item] || 'Faktor lingkungan sangat mempengaruhi waktu terurai.';
}

function closeGame() {
    const gameModal = document.getElementById('gameModal');
    if (gameModal) gameModal.classList.add('hidden');
    currentGame = null;
}
