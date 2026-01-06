import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Form, Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent";
import styles from "../../styles/profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser, updateUser } from "../../slices/userSlice";

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const fileInputRef = useRef(null);

  // NOTE: removed profilePicture from formData (backend expects it via multipart route)
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    gender: "",
    country: "",
    language: "",
    timeZone: "",
  });

  const [selectedFile, setSelectedFile] = useState(null); // NEW
  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/signin");

      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) return navigate("/signin");

        dispatch(setUser(data));

        setFormData({
          name: data.name || "",
          nickname: data.nickname || "",
          gender: data.gender || "",
          country: data.country || "",
          language: data.language || "English",
          timeZone: data.timeZone || "",
        });

        setPreviewUrl(data.profilePicture || "");
      } catch (err) {
        console.error(err);
        navigate("/signin");
      }
    };

    fetchUser();
  }, [navigate, dispatch]);

  // cleanup object URL previews
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      alert("Please select a JPG, PNG, or WEBP image.");
      return;
    }

    // Must match backend multer limit (2MB in our route)
    const maxSizeMb = 2;
    if (file.size > maxSizeMb * 1024 * 1024) {
      alert(`Please select an image smaller than ${maxSizeMb}MB.`);
      return;
    }

    setSelectedFile(file);

    // Preview immediately
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const uploadProfilePictureIfNeeded = async (token) => {
    if (!selectedFile) return null;

    const fd = new FormData();
    fd.append("profilePicture", selectedFile); // IMPORTANT: must match upload.single("profilePicture")

    const res = await fetch("http://localhost:5000/api/users/me/profile-picture", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // DO NOT set Content-Type for FormData
      },
      body: fd,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Profile picture upload failed");

    // server returns updated user with profilePicture URL
    dispatch(updateUser(data));
    return data;
  };

  const patchProfileFields = async (token) => {
    const res = await fetch("http://localhost:5000/api/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Update failed");

    dispatch(updateUser(data));
    return data;
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/signin");

    setSaving(true);
    try {
      // 1) upload image if user selected one
      await uploadProfilePictureIfNeeded(token);

      // 2) update other fields (JSON)
      await patchProfileFields(token);

      alert("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(err.message || "Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) return null;

  return (
    <div className={styles.modernEditContainer}>
      <NavbarComponent />

      <div className={styles.modernEditWrapper}>
        <div className={styles.modernEditCard}>
          {/* Header Section */}
          <div className={styles.modernEditHeader}>
            <div className={styles.editHeaderLeft}>
              <div className={styles.modernEditAvatarWrapper}>
                <Image
                  src={previewUrl || user.profilePicture || "/default-profile.png"}
                  className={styles.modernEditAvatar}
                  roundedCircle
                />

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <button
                  type="button"
                  className={styles.modernEditCameraBtn}
                  onClick={handlePickImage}
                  aria-label="Change profile picture"
                  title="Change profile picture"
                >
                  <i className="bi bi-camera-fill"></i>
                </button>
              </div>

              <div className={styles.modernEditUserInfo}>
                <h3 className={styles.modernEditUserName}>{user.name}</h3>
                <p className={styles.modernEditUserEmail}>{user.email}</p>
                <div className={styles.editBadge}>
                  <i className="bi bi-pencil-square me-1"></i>
                  Editing Profile
                </div>
              </div>
            </div>

            <div className={styles.modernEditActions}>
              <Button className={styles.modernBackBtn} onClick={() => navigate("/profile")}>
                <i className="bi bi-arrow-left me-2"></i>
                Back
              </Button>

              <Button className={styles.modernSaveBtn} onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-2"></i>
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Form Section */}
          <div className={styles.modernFormSection}>
            <h5 className={styles.formSectionTitle}>
              <i className="bi bi-person-gear me-2"></i>
              Personal Information
            </h5>

            <Row className="g-4">
              <Col xs={12} md={6}>
                <Form.Group className={styles.modernFormGroup}>
                  <Form.Label className={styles.modernFormLabel}>
                    <i className="bi bi-person me-2"></i>
                    Full Name
                  </Form.Label>
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.modernFormInput}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className={styles.modernFormGroup}>
                  <Form.Label className={styles.modernFormLabel}>
                    <i className="bi bi-emoji-smile me-2"></i>
                    Nickname
                  </Form.Label>
                  <Form.Control
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    className={styles.modernFormInput}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className={styles.modernFormGroup}>
                  <Form.Label className={styles.modernFormLabel}>
                    <i className="bi bi-gender-ambiguous me-2"></i>
                    Gender
                  </Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={styles.modernFormInput}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className={styles.modernFormGroup}>
                  <Form.Label className={styles.modernFormLabel}>
                    <i className="bi bi-geo-alt me-2"></i>
                    Country
                  </Form.Label>
                  <Form.Control
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={styles.modernFormInput}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className={styles.modernFormGroup}>
                  <Form.Label className={styles.modernFormLabel}>
                    <i className="bi bi-translate me-2"></i>
                    Language
                  </Form.Label>
                  <Form.Select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className={styles.modernFormInput}
                  >
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Urdu">Urdu</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className={styles.modernFormGroup}>
                  <Form.Label className={styles.modernFormLabel}>
                    <i className="bi bi-clock me-2"></i>
                    Time Zone
                  </Form.Label>
                  <Form.Control
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleChange}
                    className={styles.modernFormInput}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Email Section (unchanged) */}
            <div className={styles.modernEmailSection}>
              <h6 className={styles.emailSectionTitle}>
                <i className="bi bi-envelope me-2"></i>
                Email Settings
              </h6>
              <div className={styles.currentEmail}>
                <span className={styles.emailLabel}>Current Email:</span>
                <span className={styles.emailValue}>{user.email}</span>
              </div>
              <Button className={styles.addEmailBtn}>
                <i className="bi bi-plus-lg me-2"></i>
                Add Additional Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
