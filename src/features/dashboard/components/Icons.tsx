interface WashIconProps {
    size?: number; // Size in pixels
    color?: string; // Custom color
}

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

