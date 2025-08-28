document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.querySelector(".search-icon");
    const searchButton = searchIcon?.querySelector("button");
    const searchSection = document.querySelector(".search-section");
    const closeButton = document.querySelector(".search-section .close");

    if (searchButton) {
        searchButton.addEventListener("click", function () {
            searchSection?.classList.add("open");
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            searchSection?.classList.remove("open");
        });
    }

    const headers = document.querySelectorAll(".header, .header-mobil");

    if (headers.length > 0) {
        window.addEventListener("scroll", function () {
            headers.forEach(header => {
                if (window.scrollY > 0) {
                    header.classList.add("header-fixed");
                } else {
                    header.classList.remove("header-fixed");
                }
            });
        });
    }

    const menuLinks = document.querySelectorAll('.header .nav > ul > li > a');
    const hamburger = document.querySelector('.hamburger');
    const menuOverlay = document.querySelector('.menu-overlay');

    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
    
            if (window.innerWidth < 991) {
                if (href === '#' || href === 'javascript:;') {
                    event.preventDefault();
                    const submenu = this.nextElementSibling;
                    const parentLi = this.parentElement;
    
                    // Diğer alt menüleri kapat
                    menuLinks.forEach(otherLink => {
                        const otherSubmenu = otherLink.nextElementSibling;
                        const otherParentLi = otherLink.parentElement;
    
                        if (otherSubmenu && otherSubmenu.classList.contains('sub-menu') && otherSubmenu !== submenu) {
                            otherSubmenu.style.maxHeight = null; // Diğer alt menüleri kapat
                            otherParentLi.classList.remove('active'); // Diğer li'lerden active sınıfını kaldır
                        }
                    });
    
                    // Tıklanan menünün alt menüsünü aç/kapat
                    if (submenu && submenu.classList.contains('sub-menu')) {
                        if (submenu.style.maxHeight) {
                            submenu.style.maxHeight = null; // Kapat
                            parentLi.classList.remove('active'); // Eğer kapatıyorsak active sınıfını kaldır
                        } else {
                            submenu.style.maxHeight = submenu.scrollHeight + "px"; // Aç
                            parentLi.classList.add('active'); // Active sınıfını ekle
                        }
                    }
                } else {
                    // URL varsa, yönlendir
                    window.location.href = href;
                }
            } else {
                // Mobil değilse, normal davranış (yönlendirme)
                window.location.href = href;
            }
        });
    });

    // Hamburger menüsüne tıklama
    hamburger.addEventListener('click', function() {
        this.classList.toggle('open'); // open sınıfını ekle veya kaldır
    });

    // Menü overlay'ine tıklama
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            hamburger.classList.remove('open'); // open sınıfını kaldır
        });
    }
});


// Tüm ana menü öğelerini seç
var menuItems = document.querySelectorAll('.header .nav > ul > li > a');

// Her bir menü öğesi için olay dinleyicileri ekle
menuItems.forEach(function(menuItem) {
  menuItem.addEventListener('mouseenter', function() {
    // Tüm open sınıflarını kaldır
    document.querySelectorAll('.menu-overlay.open, .sub-menu.open').forEach(function(el) {
      el.classList.remove('open');
    });

    // Kardeş sub-menu'yu bul
    var subMenu = menuItem.nextElementSibling;
    if (subMenu && subMenu.classList.contains('sub-menu')) {
      subMenu.classList.add('open'); // sub-menu'ya open sınıfı ekle
      document.querySelector('.menu-overlay').classList.add('open'); // menu-overlay'e open sınıfı ekle
    }
  });

  // Sub-menu dışına çıkış için olay dinleyici ekle
  var subMenu = menuItem.nextElementSibling;
  if (subMenu && subMenu.classList.contains('sub-menu')) {
    subMenu.addEventListener('mouseleave', function() {
      subMenu.classList.remove('open'); // sub-menu'dan open sınıfını kaldır
      document.querySelector('.menu-overlay').classList.remove('open'); // menu-overlay'den open sınıfını kaldır
    });
  }
});


// Tüm menü öğelerini seç
document.querySelectorAll('.header .sub-menu').forEach(function(subMenu) {
    // O .sub-menu içindeki li'leri bul
    var subMenuItems = subMenu.querySelectorAll('.menu-list > ul > li');
    var imgElement = subMenu.querySelector('.menu-img img');
  
    // Her bir li öğesi için hover olayını dinle
    subMenuItems.forEach(function(item) {
      item.addEventListener('mouseenter', function() {
        var value = item.getAttribute('data-src');
        imgElement.setAttribute('src', value);
      });
    });
});   