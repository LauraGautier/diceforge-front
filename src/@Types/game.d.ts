export interface IInputField {
  id: number;
  name: string;
  placeholder: string;
  value: string;
}

export interface ILicences {
  id: number;
  name: string;
}

export interface IGames {
  created_at: string;
  event: string | null;
  id: number;
  invitation_token: string | null;
  license_name: string;
  music: string | null;
  name: string;
  note: string | null;
  updated_at: string | null;
}
