import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent";
import styles from "../../styles/profile.module.css";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    gender: "",
    country: "",
    language: "",
    timeZone: "",
  });
  const navigate = useNavigate();

  // useEffect mapping: ensure timeZone uses data.timeZone
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/signin");
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          setFormData({
            name: data.name || "",
            nickname: data.nickname || "",
            gender: data.gender || "",
            country: data.country || "",
            language: data.language || "English",
            timeZone: data.timeZone || "", // <-- note exact key
          });
        } else {
          navigate("/signin");
        }
      } catch (err) {
        console.error(err);
        navigate("/signin");
      }
    };
    fetchUser();
  }, [navigate]);

  // handleSave
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/signin");

    console.log("Sending PATCH payload:", formData);

    try {
      const res = await fetch("http://localhost:5000/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("PATCH response:", res.status, data);

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      // success
      setUser(data);
      alert("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Network error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  if (!user) return null;

  return (
    <Container fluid className="py-5">
      <NavbarComponent />

      <div className={`d-flex justify-content-center ${styles.mainbox}`}>
        <div className={`${styles.editProfileBox} p-4`}>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            {/* Avatar + Info */}
            <div className={styles.avatarWrapper}>
              <Image
                src={user.profilePicture || "/default-profile.png"}
                roundedCircle
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>

              <button className={styles.cameraBtn}>
                <i className="bi bi-camera-fill"></i>
              </button>
            </div>

            {/* Save Button */}
            <Button
              variant="primary"
              className={`${styles.saveBtn} mt-3 mt-md-0`}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>

          {/* Form */}
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nick Name</Form.Label>
                <Form.Control
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Language</Form.Label>
                <Form.Select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Time Zone</Form.Label>
                <Form.Control
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <h6>My Email Address</h6>
            <p className="text-muted">{user.email}</p>
            <Button variant="outline-secondary" size="sm">
              + Add Email Address
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
