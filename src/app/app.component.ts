import { Component } from '@angular/core';

interface Wish {
  number: string;
  symbol: string;
  title: string;
  text: string;
  className: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  giftOpen = false;
  bouquetReady = false;

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
}
