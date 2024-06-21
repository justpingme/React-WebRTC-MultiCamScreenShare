export interface User {
  id: string;
  name: string;
  meetingId: string;
}

export interface Meeting {
  status: string;
  users: User[];
}

export interface CreateMeetingPayload {
  meetingId: string;
  name: string;
}

export interface JoinMeetingPayload {
  meetingId: string;
  name: string;
}

export interface OfferPayload {
  to: string;
  offer: any;
  name: string;
  connectionPurpose: string;
}

export interface AnswerPayload {
  answer: any;
  to: string;
  connectionPurpose: string;
}

export interface IceCandidatePayload {
  to: string;
  iceCandidate: any;
  connectionPurpose: string;
}
