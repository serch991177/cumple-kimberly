import { Component } from '@angular/core';

interface Wish {
  number: string;
  symbol: string;
  title: string;
  text: string;
  className: string;
}

interface Coupon {
  id: string;
  code: string;
  title: string;
  detail: string;
  image: string;
  preview: string;
  message: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  giftOpen = false;
  bouquetReady = false;
  selectedCouponId = 'sushi';
  usedCoupons = new Set<string>();

  readonly flowers = Array.from({ length: 7 }, (_, index) => index);
  readonly petals = Array.from({ length: 12 }, (_, index) => index);
  readonly pollen = Array.from({ length: 16 }, (_, index) => index);
  readonly burst = Array.from({ length: 30 }, (_, index) => index);

  readonly wishes: Wish[] = [
    {
      number: '01',
      symbol: '☀',
      title: 'Días que se sientan hogar',
      text: 'Que nunca te falte calma, café rico y personas que cuiden tu corazón bonito.',
      className: 'wish-coral',
    },
    {
      number: '02',
      symbol: '✦',
      title: 'Aventuras sin mapa',
      text: 'Que colecciones lugares nuevos, carcajadas largas e historias que quieras contar mil veces.',
      className: 'wish-gold',
    },
    {
      number: '03',
      symbol: '♡',
      title: 'Amor del bueno',
      text: 'Que te quieran bonito, con verdad y con la misma inmensidad con la que tú sabes querer.',
      className: 'wish-green',
    },
  ];

  readonly coupons: Coupon[] = [
    {
      id: 'sushi',
      code: '001',
      title: 'Sushi en Amadama',
      detail: 'Una salida especial para compartir sushi y una linda conversación.',
      image: '/coupons/01-sushi-amadama.png',
      preview: '/coupons/previews/01-sushi-amadama.jpg',
      message: 'Hola 💛 Kimberly quiere canjear su cupón de sushi en Amadama 🍣. ¿Cuándo vamos?',
    },
    {
      id: 'hamburguesas',
      code: '002',
      title: 'Roast & Roll',
      detail: 'Hamburguesas, papas y un plan para disfrutar sin mirar el reloj.',
      image: '/coupons/02-roast-roll.png',
      preview: '/coupons/previews/02-roast-roll.jpg',
      message: 'Hola 💛 Kimberly quiere canjear su cupón de hamburguesas en Roast & Roll 🍔. ¿Cuándo vamos?',
    },
    {
      id: 'mimos',
      code: '003',
      title: 'Día de mimos',
      detail: 'Un día suave para consentirte, descansar y sentirte muy querida.',
      image: '/coupons/03-dia-mimos.png',
      preview: '/coupons/previews/03-dia-mimos.jpg',
      message: 'Hola 💛 Kimberly quiere canjear su cupón de día de mimos 🫶. ¿Cuándo lo hacemos?',
    },
    {
      id: 'cine',
      code: '004',
      title: 'Salida al cine',
      detail: 'Una película, palomitas y la mejor compañía para una noche bonita.',
      image: '/coupons/04-cine.png',
      preview: '/coupons/previews/04-cine.jpg',
      message: 'Hola 💛 Kimberly quiere canjear su cupón de salida al cine 🎬🍿. ¿Qué película vemos?',
    },
    {
      id: 'helado',
      code: '005',
      title: 'Una cita por helado',
      detail: 'Para elegir sabores, caminar un rato y endulzar cualquier tarde.',
      image: '/coupons/05-helado.png',
      preview: '/coupons/previews/05-helado.jpg',
      message: 'Hola 💛 Kimberly quiere canjear su cupón para ir por helado 🍦. ¿Cuándo vamos?',
    },
    {
      id: 'bobas',
      code: '006',
      title: 'Vamos por bobas',
      detail: 'Una salida por bebidas con bobas y muchas historias para ponernos al día.',
      image: '/coupons/06-bobas.png',
      preview: '/coupons/previews/06-bobas.jpg',
      message: 'Hola 💛 Kimberly quiere canjear su cupón para ir por bobas 🧋. ¿Cuándo vamos?',
    },
  ];

  readonly couponTotalCode = '006';
  private readonly whatsappNumber = '59177412318';
  private readonly usedCouponsStorageKey = 'kimberly-used-coupons';

  constructor() {
    this.restoreUsedCoupons();
  }

  get selectedCoupon(): Coupon {
    return this.coupons.find((coupon) => coupon.id === this.selectedCouponId) ?? this.coupons[0];
  }

  get selectedCouponIsUsed(): boolean {
    return this.usedCoupons.has(this.selectedCoupon.id);
  }

  get usedCouponCount(): number {
    return this.usedCoupons.size;
  }

  get whatsappUrl(): string {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.selectedCoupon.message)}`;
  }

  selectCoupon(couponId: string): void {
    this.selectedCouponId = couponId;
  }

  isCouponUsed(couponId: string): boolean {
    return this.usedCoupons.has(couponId);
  }

  toggleCouponUsed(): void {
    const nextCoupons = new Set(this.usedCoupons);

    if (nextCoupons.has(this.selectedCoupon.id)) {
      nextCoupons.delete(this.selectedCoupon.id);
    } else {
      nextCoupons.add(this.selectedCoupon.id);
    }

    this.usedCoupons = nextCoupons;
    this.saveUsedCoupons();
  }

  scrollToSurprise(): void {
    document.getElementById('sorpresa')?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleBouquet(): void {
    this.bouquetReady = !this.bouquetReady;
  }

  openGift(): void {
    this.giftOpen = true;
    window.setTimeout(() => {
      document.getElementById('carta')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 450);
  }

  private restoreUsedCoupons(): void {
    try {
      const savedCoupons = JSON.parse(localStorage.getItem(this.usedCouponsStorageKey) ?? '[]');
      if (Array.isArray(savedCoupons)) {
        this.usedCoupons = new Set(
          savedCoupons.filter((coupon): coupon is string => typeof coupon === 'string'),
        );
      }
    } catch {
      localStorage.removeItem(this.usedCouponsStorageKey);
    }
  }

  private saveUsedCoupons(): void {
    localStorage.setItem(this.usedCouponsStorageKey, JSON.stringify(Array.from(this.usedCoupons)));
  }
}
