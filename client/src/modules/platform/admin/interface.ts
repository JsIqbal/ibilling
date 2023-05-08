export interface Campaign {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface ActionProp {
    disabled?: boolean;
    modalIsOpen: boolean;
    openModal: () => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item?: any;
}
