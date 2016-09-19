import React from "react";
import TextInput from "../common/TextInput";

const ProductForm = ({product, onSave, onChange, saving, errors, onDelete, deleting}) => {
  return (
    <form>
      <TextInput
        name="ShortName"
        label="Short Name"
        value={product.ShortName}
        onChange={onChange}
        error={errors.shortName}/>

      <TextInput
        name="Description"
        label="Description"
        value={product.Description}
        onChange={onChange}
        error={errors.description}/>

      <TextInput
        name="FullName"
        label="Full Name"
        value={product.FullName}
        onChange={onChange}
        error={errors.fullName}/>

      <TextInput
        name="Price"
        label="Price"
        value={product.Price}
        onChange={onChange}
        error={errors.price}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>

      <input
        type="submit"
        disabled={deleting}
        value={deleting ? 'Deleting...' : 'Delete'}
        className="btn btn-primary"
        onClick={onDelete}/>
    </form>
  );
};

ProductForm.propTypes = {
  product: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  onDelete: React.PropTypes.func.isRequired,
  deleting: React.PropTypes.bool
};

export default ProductForm;
