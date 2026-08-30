import { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import "../css/AdminDashboard.css";
import { CATEGORIES } from "../constants/categories";

function ProductModal({ isOpen, onClose, onSave, product, isEditing }) {
  const [errors, setErrors] = useState({});
  const [imageFiles, setImageFiles] = useState([]); // ✅ Array of files
  const [imagePreviews, setImagePreviews] = useState([]); // ✅ Array of previews

  // Lazy initialization - form data populate
  const [formData, setFormData] = useState(() => {
    if (product && isEditing) {
      return {
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        category: product.category || "",
      };
    }
    return {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    };
  });

  // ✅ Handle multiple image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validate each file
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setErrors({ ...errors, image: "Please upload valid images (JPEG, PNG, JPG, WEBP, GIF)" });
      return;
    }

    // Check file size (max 5MB each)
    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      setErrors({ ...errors, image: "Each image must be less than 5MB" });
      return;
    }

    // Max 10 images
    if (imageFiles.length + files.length > 10) {
      setErrors({ ...errors, image: "Maximum 10 images allowed" });
      return;
    }

    // Add new files
    setImageFiles(prev => [...prev, ...files]);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);

    // Clear error
    if (errors.image) {
      setErrors({ ...errors, image: "" });
    }

    // Reset input
    e.target.value = null;
  };

  // ✅ Remove single image
  const handleRemoveImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      // Revoke URL to avoid memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // ✅ Remove all images
  const handleRemoveAllImages = () => {
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    setImageFiles([]);
    setImagePreviews([]);
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

    // ✅ Multiple images validation - required for new product
    if (!isEditing && imageFiles.length === 0) {
      newErrors.image = "At least one product image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Prepare data
    const saveData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    // ✅ Send to parent with image files
    onSave(saveData, imageFiles);
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
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}

            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          {/* ✅ MULTIPLE IMAGE UPLOAD */}
          <div className="form-group">
            <label>Product Images {!isEditing && "*"}</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                accept="image/*"
                multiple // ✅ Multiple attribute
                onChange={handleImageChange}
                className={errors.image ? "error" : ""}
              />
              <span className="file-upload-btn">📁 Choose Images</span>
              <span className="file-name">
                {imageFiles.length > 0
                  ? `${imageFiles.length} image${imageFiles.length > 1 ? 's' : ''} selected`
                  : "No files selected..."}
              </span>
            </div>
            <small className="helper-text">Max 10 images • Each max 5MB • JPG, PNG, WEBP, GIF</small>
            {errors.image && <span className="error-text">{errors.image}</span>}
          </div>

          {/* ✅ IMAGE PREVIEW GRID */}
          {imagePreviews.length > 0 && (
            <div className="image-preview-grid">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview-item">
                  <img src={preview} alt={`Product ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              {imageFiles.length > 0 && (
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={handleRemoveAllImages}
                >
                  <FaTrash /> Remove All
                </button>
              )}
            </div>
          )}

          {/* ✅ Existing images from product (edit mode) */}
          {isEditing && product?.images && product.images.length > 0 && imageFiles.length === 0 && (
            <div className="existing-images">
              <label>Current Images:</label>
              <div className="image-preview-grid">
                {product.images.map((img, index) => (
                  <div key={index} className="image-preview-item existing">
                    <img src={img} alt={`Product ${index + 1}`} />
                    <span className="existing-badge">Existing</span>
                  </div>
                ))}
              </div>
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