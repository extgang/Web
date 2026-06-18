document.addEventListener('DOMContentLoaded', () => {
    const glow = document.getElementById('ambientGlow');
    const grid = document.getElementById('gridOverlay');
    const tracker = document.getElementById('sysTracker');
    const form = document.getElementById('inviteForm');
    const mainContent = document.getElementById('mainContent');
    const magWrap = document.getElementById('magneticButtonWrap');
    const magBtn = document.getElementById('magneticButton');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        tracker.textContent = `SYS_LOC: ${mouseX.getNormalized(window.innerWidth)} // ${mouseY.getNormalized(window.innerHeight)}`;
    });

    Number.prototype.getNormalized = function(max) {
        return (this / max).toFixed(4);
    };

    function updateAmbient() {
        currentX += (mouseX - currentX) * 0.07;
        currentY += (mouseY - currentY) * 0.07;

        glow.style.setProperty('--mouse-x', `${currentX}px`);
        glow.style.setProperty('--mouse-y', `${currentY}px`);
        grid.style.setProperty('--mouse-x', `${currentX}px`);
        grid.style.setProperty('--mouse-y', `${currentY}px`);

        requestAnimationFrame(updateAmbient);
    }
    requestAnimationFrame(updateAmbient);

    magWrap.addEventListener('mousemove', (e) => {
        const boundBox = magBtn.getBoundingClientRect();
        const btnX = boundBox.left + boundBox.width / 2;
        const btnY = boundBox.top + boundBox.height / 2;
        const deltaX = e.clientX - btnX;
        const deltaY = e.clientY - btnY;
        
        magBtn.style.transform = `translate3d(${deltaX * 0.35}px, ${deltaY * 0.35}px, 0) scale(1.02)`;
        magBtn.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    });

    magWrap.addEventListener('mouseleave', () => {
        magBtn.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        magBtn.style.transform = 'translate3d(0, 0, 0)';
        
        setTimeout(() => {
            magBtn.style.transition = '';
        }, 600);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('emailInput').value;

        mainContent.style.transition = 'transform 0.6s var(--ease-premium), opacity 0.6s ease';
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translate3d(0, -30px, 0)';

        setTimeout(() => {
            mainContent.classList.add('form-success');
            mainContent.innerHTML = `
                <span class="badge" style="color: #34c759;">Access Granted</span>
                <h1>System Initialized.</h1>
                <p>Access key has been dispatched to <b>${email}</b>. You will be notified the moment the core platform goes live.</p>
            `;
            mainContent.style.transform = 'translate3d(0, 30px, 0)';
            mainContent.offsetHeight;
            mainContent.style.transform = 'translate3d(0, 0, 0)';
            mainContent.style.opacity = '1';
        }, 600);
    });
});
