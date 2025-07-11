import { useLocation } from "react-router-dom";
import { useState, cloneElement } from "react";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import './AdminLayout.css';
import logo from '../assets/logo.png';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const showSearchPaths = [
        "/admin/account-list", 
        "/admin/warehouse-list", 
        "/admin/product-list",  
        "/admin/batch-list",
        "/admin/batch-certificate-list",
        "/admin/distributor-list",
        "/admin/batch-stock-list",
    ];
    const showSearch = showSearchPaths.includes(location.pathname);

    const placeholderMap = {
        "/admin/account-list": "Search by email...",
        "/admin/product-list": "Search by name...",
        "/admin/warehouse-list": "Search by name...",

        "/admin/batch-list": "Search by name...",
        "/admin/batch-certificate-list": "Search by name...",
        "/admin/distributor-list": "Search by name...",
        "/admin/batch-stock-list": "Search by name...",
    };

    const placeholder = placeholderMap[location.pathname] || "Search...";
    const isProductPage = location.pathname === "/admin/product-list";
    const isAccountPage = location.pathname === "/admin/account-list";

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSearchQuery(searchInput.trim());
        }
    };

    return (
        <div className="admin_layout">
            <AdminSidebar />
            <div className="admin_content_wrapper">
                <div className="admin_top_card">
                    <img src={logo} alt="Logo" className="admin_logo" />
                    {showSearch && (
                        <div className="admin_search_section">
                            <div className="admin_search_bar_container">
                                <i className="fas fa-search admin_search_icon"></i>
                                <input
                                    type="text"
                                    className="admin_search_bar"
                                    placeholder={placeholder}
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="admin_content_card">
                    {(isProductPage || isAccountPage)
                        ? cloneElement(children, { searchQuery })
                        : children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
