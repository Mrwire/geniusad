import React from 'react';

// Import all icons individually to avoid tree-shaking issues
import {
  BeakerIcon,
  BellIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import {
  BeakerIcon as BeakerIconSolid,
  BellIcon as BellIconSolid,
  CalendarIcon as CalendarIconSolid,
  ChatBubbleLeftIcon as ChatBubbleLeftIconSolid,
  CheckIcon as CheckIconSolid,
  ChevronDownIcon as ChevronDownIconSolid,
  ChevronLeftIcon as ChevronLeftIconSolid,
  ChevronRightIcon as ChevronRightIconSolid,
  ChevronUpIcon as ChevronUpIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid,
  HomeIcon as HomeIconSolid,
  InformationCircleIcon as InformationCircleIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  PaperAirplaneIcon as PaperAirplaneIconSolid,
  PencilIcon as PencilIconSolid,
  PhoneIcon as PhoneIconSolid,
  TrashIcon as TrashIconSolid,
  UserIcon as UserIconSolid,
  XMarkIcon as XMarkIconSolid,
} from '@heroicons/react/24/solid';

export type IconName = 
  | 'beaker'
  | 'bell'
  | 'calendar'
  | 'chat'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'envelope'
  | 'exclamation'
  | 'home'
  | 'information'
  | 'search'
  | 'send'
  | 'pencil'
  | 'phone'
  | 'trash'
  | 'user'
  | 'x';

// Map icon names to components
const OUTLINE_ICONS: Record<IconName, React.ElementType> = {
  'beaker': BeakerIcon,
  'bell': BellIcon,
  'calendar': CalendarIcon,
  'chat': ChatBubbleLeftIcon,
  'check': CheckIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up': ChevronUpIcon,
  'envelope': EnvelopeIcon,
  'exclamation': ExclamationTriangleIcon,
  'home': HomeIcon,
  'information': InformationCircleIcon,
  'search': MagnifyingGlassIcon,
  'send': PaperAirplaneIcon,
  'pencil': PencilIcon,
  'phone': PhoneIcon,
  'trash': TrashIcon,
  'user': UserIcon,
  'x': XMarkIcon,
};

const SOLID_ICONS: Record<IconName, React.ElementType> = {
  'beaker': BeakerIconSolid,
  'bell': BellIconSolid,
  'calendar': CalendarIconSolid,
  'chat': ChatBubbleLeftIconSolid,
  'check': CheckIconSolid,
  'chevron-down': ChevronDownIconSolid,
  'chevron-left': ChevronLeftIconSolid,
  'chevron-right': ChevronRightIconSolid,
  'chevron-up': ChevronUpIconSolid,
  'envelope': EnvelopeIconSolid,
  'exclamation': ExclamationTriangleIconSolid,
  'home': HomeIconSolid,
  'information': InformationCircleIconSolid,
  'search': MagnifyingGlassIconSolid,
  'send': PaperAirplaneIconSolid,
  'pencil': PencilIconSolid,
  'phone': PhoneIconSolid,
  'trash': TrashIconSolid,
  'user': UserIconSolid,
  'x': XMarkIconSolid,
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  solid?: boolean;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 'md', 
  solid = false,
  className = '',
  ...props 
}) => {
  // Get the icon component
  const IconComponent = solid ? SOLID_ICONS[name] : OUTLINE_ICONS[name];
  
  if (!IconComponent) {
    console.error(`Icon ${name} not found`);
    return null;
  }

  // Size map
  const sizeClasses = {
    'xs': 'w-3 h-3',
    'sm': 'w-4 h-4',
    'md': 'w-5 h-5',
    'lg': 'w-6 h-6',
    'xl': 'w-8 h-8',
    '2xl': 'w-10 h-10',
  };

  return (
    <IconComponent 
      className={`${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
};

export default Icon; 