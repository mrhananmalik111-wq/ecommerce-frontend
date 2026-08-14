import { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import "../css/AdminDashboard.css";

function ProductModal({ isOpen, onClose, onSave, product, isEditing }) {
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // ✅ Lazy initialization - form data populate
  const [formData, setFormData] = useState(() => {
    if (product && isEditing) {
      return {
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        image: product.image || "",
        category: product.category || "",
      };
    }
    return {
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
      category: "",
    };
  });

  // ✅ Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, image: "Please upload a valid image (JPEG, PNG, JPG, WEBP, GIF)" });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size must be less than 5MB" });
        return;
      }

      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.image) {
        setErrors({ ...errors, image: "" });
      }
    }
  };

  // ✅ Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData({ ...formData, image: "" });
  };

  // ✅ Input change handle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // ✅ Form submit handle
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (formData.price && isNaN(formData.price)) newErrors.price = "Price must be a number";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (formData.stock && isNaN(formData.stock)) newErrors.stock = "Stock must be a number";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    // ✅ Image validation - required for new product
    if (!isEditing && !imageFile && !formData.image) {
      newErrors.image = "Product image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    //Prepare data for save
    const saveData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    if (imageFile) {
      onSave(saveData);
    } else {
      onSave(saveData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEditing ? "✏️ Edit Product" : "➕ Add New Product"}</h3>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {/* Product Name */}
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., iPhone 15 Pro"
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description..."
              rows="3"
              className={errors.description ? "error" : ""}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-row">
            {/* Price */}
            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={errors.price ? "error" : ""}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            {/* Stock */}
            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={errors.stock ? "error" : ""}
              />
              {errors.stock && <span className="error-text">{errors.stock}</span>}
            </div>
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? "error" : ""}
            >
              <option value="">Select Category</option>
              <option value="Electronics">📱 Electronics</option>
              <option value="Clothing">👕 Clothing</option>
              <option value="Books">📚 Books</option>
              <option value="Food">🍔 Food</option>
              <option value="Other">📦 Other</option>
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          {/* ✅ IMAGE UPLOAD - File Input */}
          <div className="form-group">
            <label>Product Image {!isEditing && "*"}</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={errors.image ? "error" : ""}
              />
              <span className="file-upload-btn">📁 Choose File</span>  {/* ✅ YELLOW BUTTON */}
              <span className="file-name">
                {imageFile ? imageFile.name : "No file selected..."}
              </span>
            </div>
            {errors.image && <span className="error-text">{errors.image}</span>}
          </div>

          {/* ✅ IMAGE PREVIEW */}
          {(imagePreview || formData.image) && (
            <div className="image-preview">
              <img
                src={imagePreview || formData.image}
                alt="Product preview"
              />
              {imagePreview && (
                <button
                  type="button"
                  className="remove-image"
                  onClick={handleRemoveImage}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isEditing ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;