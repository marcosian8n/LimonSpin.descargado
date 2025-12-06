export interface Prize {
  id: string;
  label: string;
  color: string;
  textColor: string;
  isGrandPrize?: boolean;
  isBoobyPrize?: boolean;
}

export interface SpinResult {
  prize: Prize;
  message?: string;
}
