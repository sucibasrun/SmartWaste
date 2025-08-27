let chatbotOpen = false;

// Chatbot functions
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const icon = document.getElementById('chatIcon');
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        if (chatbot) chatbot.classList.remove('hidden');
        if (icon) icon.textContent = '✕';
    } else {
        if (chatbot) chatbot.classList.add('hidden');
        if (icon) icon.textContent = '💬';
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesDiv = document.getElementById('chatMessages');
    
    if (!input || !messagesDiv) return;

    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    messagesDiv.innerHTML += `
        <div class="text-right mb-2">
            <div class="bg-blue-500 text-white p-3 rounded-lg inline-block max-w-xs">
                <p class="text-sm">${message}</p>
            </div>
        </div>
    `;
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateChatbotResponse(message);
        messagesDiv.innerHTML += `
            <div class="bg-gray-100 p-3 rounded-lg mb-2">
                <p class="text-sm">${response}</p>
            </div>
        `;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 1000);
    
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function generateChatbotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('b3') || lowerMessage.includes('berbahaya') || lowerMessage.includes('beracun')) {
        return '⚠️ PERINGATAN! Sampah B3 (Bahan Berbahaya dan Beracun) harus ditangani dengan hati-hati. Jangan buang sembarangan! Serahkan ke fasilitas pengelolaan B3 yang tepat seperti drop box khusus atau fasilitas daur ulang B3.';
    }
    
    if (lowerMessage.includes('organik')) {
        return '🌱 Sampah organik mudah terurai secara alami! Contohnya kulit buah, daun, sisa makanan. Bisa dijadikan kompos untuk menyuburkan tanah. Waktu terurai biasanya 2 minggu - 6 bulan.';
    }
    
    if (lowerMessage.includes('anorganik') || lowerMessage.includes('plastik')) {
        return '♻️ Sampah anorganik sulit terurai. Plastik bisa membutuhkan 450-1000 tahun! Sebaiknya didaur ulang atau dikurangi penggunaannya. Ganti dengan alternatif ramah lingkungan.';
    }
    
    if (lowerMessage.includes('daur ulang') || lowerMessage.includes('recycle')) {
        return '♻️ Daur ulang sangat penting! Pisahkan sampah berdasarkan jenisnya. Bersihkan sebelum didaur ulang. Ingat prinsip 5R: Refuse, Reduce, Reuse, Recycle, Replace!';
    }
    
    if (lowerMessage.includes('kompos')) {
        return '🌱 Kompos dibuat dari sampah organik! Campurkan bahan hijau (sisa sayuran) dengan bahan coklat (daun kering). Aduk secara teratur dan tunggu 2-3 bulan. Hasilnya pupuk alami yang bagus!';
    }
    
    if (lowerMessage.includes('dampak') || lowerMessage.includes('bahaya')) {
        return '⚠️ Dampak sampah sangat serius: mencemari tanah dan air, menyebabkan banjir, merusak ekosistem, menimbulkan penyakit, dan berkontribusi pada pemanasan global. Mari kelola sampah dengan baik!';
    }
    
    return '🤖 Terima kasih atas pertanyaannya! Saya siap membantu Anda belajar tentang pengelolaan sampah. Coba tanya tentang jenis sampah, cara daur ulang, atau dampak sampah terhadap lingkungan.';
}
