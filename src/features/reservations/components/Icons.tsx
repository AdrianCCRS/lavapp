import type {SVGProps} from "react";

interface WashIconProps {
    size?: number; // Size in pixels
    color?: string; // Custom color
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
  };

export const WashIcon = ({ size = 256, color = "#000000" }: WashIconProps) => (
    <svg
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 1024 1024"
        className="icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
    >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M214.25 133.12h600v790a30 30 0 0 1-30 30h-540a30 30 0 0 1-30-30v-790z" fill="#DFEDFF"></path>
            <path d="M784.25 960.62h-540a37.54 37.54 0 0 1-37.5-37.5v-790a7.5 7.5 0 0 1 7.5-7.5h600a7.5 7.5 0 0 1 7.5 7.5v790a37.54 37.54 0 0 1-37.5 37.5z m-562.5-820v782.5a22.53 22.53 0 0 0 22.5 22.5h540a22.53 22.53 0 0 0 22.5-22.5v-782.5z" fill="#66A9F7"></path>
            <path d="M244.25 72.5h540a30 30 0 0 1 30 30v170h-600v-170a30 30 0 0 1 30-30z" fill="#FFFFFF"></path>
            <path d="M814.25 280h-600a7.5 7.5 0 0 1-7.5-7.5v-170a37.54 37.54 0 0 1 37.5-37.5h540a37.54 37.54 0 0 1 37.5 37.5v170a7.5 7.5 0 0 1-7.5 7.5z m-592.5-15h585V102.5a22.53 22.53 0 0 0-22.5-22.5h-540a22.53 22.53 0 0 0-22.5 22.5z" fill="#66A9F7"></path>
            <path d="M514.25 569.19m-200 0a200 200 0 1 0 400 0 200 200 0 1 0-400 0Z" fill="#FFFFFF"></path>
            <path d="M514.25 776.69c-114.42 0-207.5-93.08-207.5-207.5s93.08-207.5 207.5-207.5 207.5 93.08 207.5 207.5-93.08 207.5-207.5 207.5z m0-400c-106.15 0-192.5 86.36-192.5 192.5s86.35 192.5 192.5 192.5 192.5-86.36 192.5-192.5-86.35-192.5-192.5-192.5z" fill="#66A9F7"></path>
            <path d="M514.25 569.19m-150 0a150 150 0 1 0 300 0 150 150 0 1 0-300 0Z" fill="#DFEDFF"></path>
            <path d="M284.25 147.5h50v50h-50z" fill="#DFEDFF"></path>
            <path d="M334.25 205h-50a7.5 7.5 0 0 1-7.5-7.5v-50a7.5 7.5 0 0 1 7.5-7.5h50a7.5 7.5 0 0 1 7.5 7.5v50a7.5 7.5 0 0 1-7.5 7.5z m-42.5-15h35v-35h-35z" fill="#66A9F7"></path>
            <path d="M367.24 147.5h50v50h-50z" fill="#DFEDFF"></path>
            <path d="M417.24 205h-50a7.5 7.5 0 0 1-7.5-7.5v-50a7.5 7.5 0 0 1 7.5-7.5h50a7.5 7.5 0 0 1 7.5 7.5v50a7.5 7.5 0 0 1-7.5 7.5z m-42.5-15h35v-35h-35z" fill="#66A9F7"></path>
            <path d="M450.22 147.5h50v50h-50z" fill="#DFEDFF"></path>
            <path d="M500.22 205h-50a7.5 7.5 0 0 1-7.5-7.5v-50a7.5 7.5 0 0 1 7.5-7.5h50a7.5 7.5 0 0 1 7.5 7.5v50a7.5 7.5 0 0 1-7.5 7.5z m-42.5-15h35v-35h-35z" fill="#66A9F7"></path>
            <path d="M708.44 172.5m-30 0a30 30 0 1 0 60 0 30 30 0 1 0-60 0Z" fill="#DFEDFF"></path>
            <path d="M708.44 210a37.5 37.5 0 1 1 37.5-37.5 37.54 37.54 0 0 1-37.5 37.5z m0-60a22.5 22.5 0 1 0 22.5 22.5 22.53 22.53 0 0 0-22.5-22.5z" fill="#66A9F7"></path>
        </g>
    </svg>
);

export const TimeIcon = ({ size = 256, color = "#000000" }: WashIconProps) => (
    <svg
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 24 24"
        className="icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
    >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g id="style=linear">
                <g id="timer">
                    <path
                        id="vector"
                        d="M21 13.25C21 18.218 16.968 22.25 12 22.25C7.032 22.25 3 18.218 3 13.25C3 8.282 7.032 4.25 12 4.25C16.968 4.25 21 8.282 21 13.25Z"
                        stroke={color}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        id="Vector"
                        d="M12 8.25V13.25"
                        stroke={color}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        id="line"
                        d="M9 1.75L15 1.75"
                        stroke={color}
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </g>
            </g>
        </g>
    </svg>
);

export const PlusIcon = ({size = 24, width, height, ...props}: IconSvgProps) => {
return (
    <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
    >
    <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
    >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
    </g>
    </svg>
);
};

export const SearchIcon = (props: IconSvgProps) => {
return (
    <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
    >
    <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
    />
    <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
    />
    </svg>
);
};

export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}: IconSvgProps) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...otherProps}
      >
        <path
          d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  };