import { Tooltip } from '@nextui-org/tooltip';
import { memo } from 'react';
import { sizes } from '../../ui/constants/sizes.constant';
import { useJsonSeaRecommendedWidth } from '../../ui/hooks/useJsonSeaRecommendedWidth';

const _JsonSeaLogoTitle = () => {
  const { isJsonSeaRecommendedWidth } = useJsonSeaRecommendedWidth();

  return (
    <Tooltip
      className="break-all p-2"
      color="warning"
      isOpen={!isJsonSeaRecommendedWidth}
      isDisabled={isJsonSeaRecommendedWidth}
      content={
        <>
          We recommend diving into the JSON Sea at least <b>{sizes.jsonSeaRecommendedWidth}px</b>
        </>
      }
      placement="bottom"
    >
      <svg className="h-[36px] w-auto" viewBox="0 0 225 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 'J' */}
        <path
          className="fill-titleJson"
          d="M82.5924 19.3182H87.4567V35.5455C87.4567 37.0455 87.1195 38.3485 86.4452 39.4545C85.7785 40.5606 84.8503 41.4129 83.6608 42.0114C82.4712 42.6098 81.0884 42.9091 79.5125 42.9091C78.1108 42.9091 76.8379 42.6629 75.6938 42.1705C74.5573 41.6705 73.6556 40.9129 72.9889 39.8977C72.3221 38.875 71.9926 37.5909 72.0001 36.0455H76.8985C76.9137 36.6591 77.0387 37.1856 77.2736 37.625C77.516 38.0568 77.8456 38.3902 78.2623 38.625C78.6866 38.8523 79.1867 38.9659 79.7625 38.9659C80.3687 38.9659 80.8801 38.8371 81.2968 38.5795C81.7211 38.3144 82.0431 37.928 82.2628 37.4205C82.4826 36.9129 82.5924 36.2879 82.5924 35.5455V19.3182Z"
        />
        {/* 'S' */}
        <path
          className="fill-titleJson"
          d="M104.152 26.0114C104.061 25.0947 103.671 24.3826 102.981 23.875C102.292 23.3674 101.356 23.1136 100.174 23.1136C99.3712 23.1136 98.693 23.2273 98.1399 23.4545C97.5868 23.6742 97.1625 23.9811 96.867 24.375C96.5791 24.7689 96.4352 25.2159 96.4352 25.7159C96.42 26.1326 96.5072 26.4962 96.6966 26.8068C96.8936 27.1174 97.1625 27.3864 97.5035 27.6136C97.8445 27.8333 98.2384 28.0265 98.6855 28.1932C99.1325 28.3523 99.6098 28.4886 100.117 28.6023L102.209 29.1023C103.224 29.3295 104.156 29.6326 105.004 30.0114C105.853 30.3902 106.588 30.8561 107.209 31.4091C107.831 31.9621 108.312 32.6136 108.653 33.3636C109.001 34.1136 109.179 34.9735 109.187 35.9432C109.179 37.3674 108.816 38.6023 108.096 39.6477C107.384 40.6856 106.353 41.4924 105.004 42.0682C103.663 42.6364 102.046 42.9205 100.152 42.9205C98.2725 42.9205 96.636 42.6326 95.2418 42.0568C93.8553 41.4811 92.7718 40.6288 91.9914 39.5C91.2186 38.3636 90.8132 36.9583 90.7753 35.2841H95.5373C95.5904 36.0644 95.8139 36.7159 96.2079 37.2386C96.6094 37.7538 97.1436 38.1439 97.8104 38.4091C98.4847 38.6667 99.2461 38.7955 100.095 38.7955C100.928 38.7955 101.652 38.6742 102.265 38.4318C102.887 38.1894 103.368 37.8523 103.709 37.4205C104.05 36.9886 104.22 36.4924 104.22 35.9318C104.22 35.4091 104.065 34.9697 103.754 34.6136C103.451 34.2576 103.004 33.9545 102.413 33.7045C101.83 33.4545 101.114 33.2273 100.265 33.0227L97.7308 32.3864C95.7684 31.9091 94.219 31.1629 93.0825 30.1477C91.9459 29.1326 91.3815 27.7652 91.3891 26.0455C91.3815 24.6364 91.7565 23.4053 92.5142 22.3523C93.2795 21.2992 94.3288 20.4773 95.6623 19.8864C96.9959 19.2955 98.5112 19 100.208 19C101.936 19 103.444 19.2955 104.732 19.8864C106.027 20.4773 107.035 21.2992 107.755 22.3523C108.475 23.4053 108.846 24.625 108.869 26.0114H104.152Z"
        />
        {/* 'O' */}
        <path
          className="fill-titleJson"
          d="M133.886 30.9545C133.886 33.4924 133.405 35.6515 132.443 37.4318C131.488 39.2121 130.185 40.572 128.533 41.5114C126.889 42.4432 125.04 42.9091 122.987 42.9091C120.919 42.9091 119.062 42.4394 117.418 41.5C115.774 40.5606 114.474 39.2008 113.52 37.4205C112.565 35.6402 112.088 33.4848 112.088 30.9545C112.088 28.4167 112.565 26.2576 113.52 24.4773C114.474 22.697 115.774 21.3409 117.418 20.4091C119.062 19.4697 120.919 19 122.987 19C125.04 19 126.889 19.4697 128.533 20.4091C130.185 21.3409 131.488 22.697 132.443 24.4773C133.405 26.2576 133.886 28.4167 133.886 30.9545ZM128.897 30.9545C128.897 29.3106 128.651 27.9242 128.158 26.7955C127.673 25.6667 126.988 24.8106 126.101 24.2273C125.215 23.6439 124.177 23.3523 122.987 23.3523C121.797 23.3523 120.759 23.6439 119.873 24.2273C118.986 24.8106 118.297 25.6667 117.804 26.7955C117.32 27.9242 117.077 29.3106 117.077 30.9545C117.077 32.5985 117.32 33.9848 117.804 35.1136C118.297 36.2424 118.986 37.0985 119.873 37.6818C120.759 38.2652 121.797 38.5568 122.987 38.5568C124.177 38.5568 125.215 38.2652 126.101 37.6818C126.988 37.0985 127.673 36.2424 128.158 35.1136C128.651 33.9848 128.897 32.5985 128.897 30.9545Z"
        />
        {/* 'N' */}
        <path
          className="fill-titleJson"
          d="M157 19.3182V42.5909H152.749L142.623 27.9432H142.453V42.5909H137.532V19.3182H141.85L151.897 33.9545H152.102V19.3182H157Z"
        />
        {/* 'S' */}
        <path
          className="fill-titleSea"
          d="M176.279 26.0114C176.189 25.0947 175.801 24.3826 175.117 23.875C174.432 23.3674 173.504 23.1136 172.33 23.1136C171.533 23.1136 170.86 23.2273 170.311 23.4545C169.762 23.6742 169.34 23.9811 169.047 24.375C168.761 24.7689 168.618 25.2159 168.618 25.7159C168.603 26.1326 168.69 26.4962 168.878 26.8068C169.073 27.1174 169.34 27.3864 169.679 27.6136C170.017 27.8333 170.408 28.0265 170.852 28.1932C171.296 28.3523 171.77 28.4886 172.274 28.6023L174.35 29.1023C175.358 29.3295 176.283 29.6326 177.125 30.0114C177.967 30.3902 178.697 30.8561 179.314 31.4091C179.93 31.9621 180.408 32.6136 180.747 33.3636C181.092 34.1136 181.269 34.9735 181.277 35.9432C181.269 37.3674 180.908 38.6023 180.194 39.6477C179.487 40.6856 178.464 41.4924 177.125 42.0682C175.794 42.6364 174.188 42.9205 172.308 42.9205C170.442 42.9205 168.818 42.6326 167.434 42.0568C166.057 41.4811 164.982 40.6288 164.207 39.5C163.44 38.3636 163.038 36.9583 163 35.2841H167.727C167.78 36.0644 168.002 36.7159 168.393 37.2386C168.791 37.7538 169.322 38.1439 169.984 38.4091C170.653 38.6667 171.409 38.7955 172.251 38.7955C173.079 38.7955 173.797 38.6742 174.406 38.4318C175.023 38.1894 175.5 37.8523 175.839 37.4205C176.177 36.9886 176.347 36.4924 176.347 35.9318C176.347 35.4091 176.192 34.9697 175.884 34.6136C175.583 34.2576 175.139 33.9545 174.553 33.7045C173.974 33.4545 173.263 33.2273 172.42 33.0227L169.905 32.3864C167.957 31.9091 166.418 31.1629 165.29 30.1477C164.162 29.1326 163.602 27.7652 163.609 26.0455C163.602 24.6364 163.974 23.4053 164.726 22.3523C165.486 21.2992 166.527 20.4773 167.851 19.8864C169.175 19.2955 170.679 19 172.364 19C174.079 19 175.576 19.2955 176.854 19.8864C178.14 20.4773 179.141 21.2992 179.855 22.3523C180.57 23.4053 180.938 24.625 180.961 26.0114H176.279Z"
        />
        {/* 'E' */}
        <path
          className="fill-titleSea"
          d="M184.563 42.5909V19.3182H200.132V23.375H189.448V28.9205H199.331V32.9773H189.448V38.5341H200.177V42.5909H184.563Z"
        />
        {/* 'A' */}
        <path
          className="fill-titleSea"
          d="M207.998 42.5909H202.763L210.74 19.3182H217.035L225 42.5909H219.765L213.978 24.6364H213.797L207.998 42.5909ZM207.671 33.4432H220.036V37.2841H207.671V33.4432Z"
        />

        <mask
          id="json-sea-logo-mask"
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="64"
          height="64"
        >
          <path
            d="M64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32Z"
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#json-sea-logo-mask)">
          <path
            d="M66.5263 32.4303C66.5263 51.5014 51.0661 66.9615 31.995 66.9615C12.9239 66.9615 -2.53629 51.5014 -2.53629 32.4303C-2.53629 13.3592 12.9239 -2.10101 31.995 -2.10101C51.0661 -2.10101 66.5263 13.3592 66.5263 32.4303Z"
            fill="#7B8187"
          />
          <path
            d="M66.6261 32.4303C66.6261 51.5014 51.1659 66.9615 32.0948 66.9615C13.0237 66.9615 -2.43646 51.5014 -2.43646 32.4303C-2.43646 13.3592 13.0237 -2.10101 32.0948 -2.10101C51.1659 -2.10101 66.6261 13.3592 66.6261 32.4303Z"
            fill="#96C1F2"
          />
          <path
            d="M67.608 17.3268C73.071 38.8051 60.088 60.6454 38.6097 66.1084C17.1313 71.5714 -4.70896 58.5884 -10.172 37.1101C-15.635 15.6317 17.1313 24.6005 38.6096 19.1375C60.088 13.6745 62.145 -4.15156 67.608 17.3268Z"
            fill="#4C76A5"
          />
          <path
            d="M64.8859 26.2055C68.8237 44.8656 56.889 63.1848 38.2288 67.1227C19.5687 71.0606 1.24945 59.1258 -2.68841 40.4657C-6.62627 21.8056 21.4844 35.3645 40.1445 31.4266C58.8046 27.4888 60.948 7.54533 64.8859 26.2055Z"
            fill="#00254D"
          />
          <path
            d="M17.2083 -1.61124L20.9108 -3.00429L47.5745 61.7415L38.1827 65.1599L17.2083 -1.61124Z"
            fill="#ffffff"
            fillOpacity="0.5"
          />
        </g>
      </svg>
    </Tooltip>
  );
};

export const JsonSeaLogoTitle = memo(_JsonSeaLogoTitle);