import {useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import "./CustomDropdown.sass"

type DropdownProps = {
    label: string,
    options: Record<string, string>,
    selectedItem: string,
    setSelectedItem: (val:string) => void
}

const CustomDropdown = ({label, options, selectedItem, setSelectedItem}:DropdownProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className="dropdown-container">
            <span>{label}</span>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle color="primary" caret>{options[selectedItem]}</DropdownToggle>
                <DropdownMenu>
                    {Object.entries(options).map(([key, value]) => (
                        <DropdownItem active={key == selectedItem} key={key} onClick={() => setSelectedItem(key)}>{value}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default CustomDropdown