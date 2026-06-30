import type { SVGProps, ReactElement } from 'react';
import {
  TrashIcon,
  SofaIcon,
  TruckIcon,
  HomeIcon,
  BoxesIcon,
  BuildingIcon,
} from './icons';

type Icon = (p: SVGProps<SVGSVGElement>) => ReactElement;

/** Maps a service key (shared across messages) to its icon. */
export const serviceIcons: Record<string, Icon> = {
  junk: TrashIcon,
  moving: SofaIcon,
  hauling: TruckIcon,
  cleanout: HomeIcon,
  appliance: BoxesIcon,
  commercial: BuildingIcon,
};
