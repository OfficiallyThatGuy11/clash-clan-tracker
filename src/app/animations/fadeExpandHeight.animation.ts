import {
  animation, trigger, state,
  style, transition, animate
} from "@angular/animations";

export const fadeExpandHeight =
  trigger('fadeExpandHeight', [
    state('show', style({
      height: '*',
      opacity: '1'
    })),
    state('hide', style({
      height: '0',
      opacity: '0',
      width: '100%',
      borderWidth: '0',
      boxShadow: 'none',
    })),
    transition('* => *', [
      animate('0.15s ease-in-out')
    ])
  ]);