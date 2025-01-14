// Professional scroll behavior
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Refined navbar behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else if (currentScroll > lastScroll) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
        nav.style.background = '#000';
    }
    lastScroll = currentScroll;
});

// Professional car details interaction
document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
        const car = button.dataset.car;
        const details = document.getElementById(`${car}-details`);
        const allDetails = document.querySelectorAll('.car-details');
        const allButtons = document.querySelectorAll('.details-btn');
        
        allDetails.forEach(detail => {
            if (detail !== details && detail.classList.contains('active')) {
                detail.style.display = 'none';
                detail.classList.remove('active');
            }
        });
        
        allButtons.forEach(btn => {
            if (btn !== button) {
                btn.textContent = 'View Details';
            }
        });
        
        if (!details.classList.contains('active')) {
            details.style.display = 'block';
            details.animate([
                { opacity: 0, transform: 'translateY(-10px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 300,
                easing: 'ease-out'
            });
            details.classList.add('active');
            button.textContent = 'Hide Details';
        } else {
            details.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-10px)' }
            ], {
                duration: 300,
                easing: 'ease-in'
            }).onfinish = () => {
                details.style.display = 'none';
                details.classList.remove('active');
            };
            button.textContent = 'View Details';
        }
    });
});

// Professional load more functionality
const additionalCars = [
    {
        image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=500',
        name: 'Lamborghini Aventador',
        description: 'Experience unparalleled performance and iconic design',
        specs: {
            engine: '6.5L V12',
            power: '769 HP',
            acceleration: '2.8s 0-60 mph',
            price: '$417,826'
        }
    },
    {
        image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=500',
        name: 'Rolls-Royce Ghost',
        description: 'The pinnacle of luxury and sophistication',
        specs: {
            engine: '6.75L V12 Twin-Turbo',
            power: '563 HP',
            acceleration: '4.6s 0-60 mph',
            price: '$332,500'
        }
    }
];

let carsLoaded = false;

document.getElementById('load-more').addEventListener('click', () => {
    if (!carsLoaded) {
        const carGrid = document.querySelector('.car-grid');
        
        additionalCars.forEach((car, index) => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            carCard.style.opacity = '0';
            carCard.style.transform = 'translateY(20px)';
            
            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <h3>${car.name}</h3>
                <p>${car.description}</p>
                <button class="details-btn" data-car="${car.name.toLowerCase().replace(/\s+/g, '-')}">View Details</button>
                <div class="car-details" id="${car.name.toLowerCase().replace(/\s+/g, '-')}-details">
                    <h4>Specifications</h4>
                    <ul>
                        <li>Engine: ${car.specs.engine}</li>
                        <li>Power: ${car.specs.power}</li>
                        <li>0-60 mph: ${car.specs.acceleration}</li>
                        <li>Price: ${car.specs.price}</li>
                    </ul>
                </div>
            `;
            
            carGrid.appendChild(carCard);

            requestAnimationFrame(() => {
                carCard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                carCard.style.opacity = '1';
                carCard.style.transform = 'translateY(0)';
            });

            const newButton = carCard.querySelector('.details-btn');
            newButton.addEventListener('click', () => {
                const details = carCard.querySelector('.car-details');
                const allDetails = document.querySelectorAll('.car-details');
                const allButtons = document.querySelectorAll('.details-btn');
                
                allDetails.forEach(detail => {
                    if (detail !== details && detail.classList.contains('active')) {
                        detail.style.display = 'none';
                        detail.classList.remove('active');
                    }
                });
                
                allButtons.forEach(btn => {
                    if (btn !== newButton) {
                        btn.textContent = 'View Details';
                    }
                });
                
                if (!details.classList.contains('active')) {
                    details.style.display = 'block';
                    details.animate([
                        { opacity: 0, transform: 'translateY(-10px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], {
                        duration: 300,
                        easing: 'ease-out'
                    });
                    details.classList.add('active');
                    newButton.textContent = 'Hide Details';
                } else {
                    details.animate([
                        { opacity: 1, transform: 'translateY(0)' },
                        { opacity: 0, transform: 'translateY(-10px)' }
                    ], {
                        duration: 300,
                        easing: 'ease-in'
                    }).onfinish = () => {
                        details.style.display = 'none';
                        details.classList.remove('active');
                    };
                    newButton.textContent = 'View Details';
                }
            });
        });

        carsLoaded = true;
        const loadMoreBtn = document.getElementById('load-more');
        loadMoreBtn.style.opacity = '0';
        setTimeout(() => {
            loadMoreBtn.style.display = 'none';
        }, 300);
    }
});

// Professional contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        this.reset();
        button.textContent = 'Message Sent';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }, 1500);
});