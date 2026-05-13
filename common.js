// 嫩江流域传统村落保护数字化平台 - 公共JavaScript

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化功能
    initSmoothScroll();
    initImageLazyLoad();
    initVideoAutoplay();
    
    // 添加页面加载动画
    document.body.classList.add('loaded');
});

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 图片懒加载
function initImageLazyLoad() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 视频自动播放控制
function initVideoAutoplay() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // 确保视频静音以允许自动播放
        video.muted = true;
        
        // 监听视频加载
        video.addEventListener('loadeddata', function() {
            this.play().catch(e => {
                console.log('视频自动播放失败:', e);
            });
        });
    });
}

// 添加页面切换动画
function addPageTransition() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是当前页面链接，不执行跳转
            if (this.classList.contains('active')) {
                e.preventDefault();
                return;
            }
            
            // 添加页面离开动画
            document.body.classList.add('page-leaving');
            
            // 延迟跳转以显示动画
            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        });
    });
}

// 图片点击放大功能
function initImageModal() {
    const images = document.querySelectorAll('.content-image, .gallery-image');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            createImageModal(this.src, this.alt);
        });
    });
}

// 创建图片模态框
function createImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <img src="${src}" alt="${alt}" class="modal-image">
                <button class="modal-close">&times;</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            document.body.removeChild(modal);
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.image-modal')) {
            const modal = document.querySelector('.image-modal');
            document.body.removeChild(modal);
        }
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    addPageTransition();
    initImageModal();
});