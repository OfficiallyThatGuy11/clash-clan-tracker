import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const fadeExpandHeight = trigger('fadeExpandHeight', [
  state(
    'show',
    style({
      height: '*',
      opacity: '1',
    })
  ),
  state(
    'hide',
    style({
      height: '0',
      opacity: '0',
      borderWidth: '0',
      boxShadow: 'none',
      marginTop: '0',
      marginBottom: '0',
      paddingTop: '0',
      paddingBottom: '0',
      pointerEvents: 'none',
    })
  ),
  transition('* => *', [animate('0.1s ease-in-out')]),
]);
