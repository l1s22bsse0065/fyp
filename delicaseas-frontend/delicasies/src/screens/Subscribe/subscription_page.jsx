import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Table, Accordion } from "react-bootstrap";
import NavbarComponent from "../../components/NavbarComponent";
import FooterSection from "../../components/FooterSection";
import styles from "../../styles/subscription.module.css";

export default function Subscription() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const plans = {
    free: {
      name: "Food Explorer",
      price: { monthly: 0, yearly: 0 },
      badge: "Free Forever",
      badgeClass: "free-badge",
      features: [
        "50+ basic recipes",
        "Weekly newsletter",
        "Basic cooking tips",
        "Community access",
        "Recipe ratings & reviews"
      ]
    },
    premium: {
      name: "Master Chef",
      price: { monthly: 9.99, yearly: 99 },
      badge: "Most Popular",
      badgeClass: "popular-badge",
      features: [
        "Everything in Free",
        "500+ premium recipes",
        "Ad-free experience", 
        "Video tutorials",
        "Meal planning tools",
        "Shopping lists",
        "Priority support"
      ]
    },
    pro: {
      name: "Culinary Expert",
      price: { monthly: 19.99, yearly: 199 },
      badge: "Best Value",
      badgeClass: "pro-badge",
      features: [
        "Everything in Premium",
        "1000+ exclusive recipes",
        "Live cooking classes",
        "1-on-1 chef consultations",
        "Custom recipe creation",
        "Nutrition analysis",
        "Early feature access"
      ]
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Cook",
      image: "/testimonial1.jpg",
      rating: 5,
      review: "The premium recipes have completely transformed my cooking! The video tutorials are incredibly helpful."
    },
    {
      name: "Mike Chen",
      role: "Food Enthusiast", 
      image: "/testimonial2.jpg",
      rating: 5,
      review: "Live cooking classes are amazing. I've learned techniques I never thought possible at home."
    },
    {
      name: "Emily Rodriguez",
      role: "Busy Mom",
      image: "/testimonial3.jpg",
      rating: 5,
      review: "Meal planning feature saves me hours every week. Worth every penny!"
    }
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes! You can cancel your subscription at any time. Your access will continue until the end of your current billing period."
    },
    {
      question: "What happens to my saved recipes if I downgrade?",
      answer: "Your saved recipes will remain in your account, but you may lose access to premium-only recipes until you upgrade again."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes! We offer a 50% student discount with valid student ID verification. Contact our support team for details."
    },
    {
      question: "Can I share my account with family?",
      answer: "Pro tier includes family sharing for up to 4 members. Premium and Free tiers are for individual use only."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start."
    }
  ];

  const getSavings = (plan) => {
    if (plan === "free") return 0;
    const monthly = plans[plan].price.monthly * 12;
    const yearly = plans[plan].price.yearly;
    return Math.round(((monthly - yearly) / monthly) * 100);
  };

  return (
    <div className={styles.subscriptionPage}>
      <NavbarComponent />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Elevate Your <span className={styles.highlight}>Culinary Journey</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Join thousands of home chefs mastering the art of cooking with our premium recipes, 
              expert guidance, and exclusive cooking classes.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10K+</span>
                <span className={styles.statLabel}>Happy Chefs</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1000+</span>
                <span className={styles.statLabel}>Premium Recipes</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Live Classes</span>
              </div>
            </div>
            <Button className={styles.heroBtn} size="lg">
              <i className="bi bi-play-circle me-2"></i>
              Start Free Trial
            </Button>
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricingSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Choose Your Cooking Adventure</h2>
            <p className={styles.sectionSubtitle}>
              Select the perfect plan to match your culinary ambitions
            </p>
            
            {/* Billing Toggle */}
            <div className={styles.billingToggle}>
              <span className={billingPeriod === "monthly" ? styles.active : ""}>Monthly</span>
              <div 
                className={styles.toggleSwitch}
                onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
              >
                <div className={`${styles.toggleSlider} ${billingPeriod === "yearly" ? styles.yearly : ""}`}></div>
              </div>
              <span className={billingPeriod === "yearly" ? styles.active : ""}>
                Yearly <span className={styles.savings}>Save 17%</span>
              </span>
            </div>
          </div>

          <Row className="g-4">
            {Object.entries(plans).map(([key, plan]) => (
              <Col lg={4} md={6} key={key}>
                <Card className={`${styles.pricingCard} ${selectedPlan === key ? styles.selected : ""}`}>
                  {plan.badge && (
                    <div className={`${styles.planBadge} ${styles[plan.badgeClass]}`}>
                      {plan.badge}
                    </div>
                  )}
                  
                  <Card.Body className={styles.cardBody}>
                    <h3 className={styles.planName}>{plan.name}</h3>
                    
                    <div className={styles.priceWrapper}>
                      <span className={styles.currency}>$</span>
                      <span className={styles.price}>
                        {billingPeriod === "monthly" 
                          ? plan.price.monthly 
                          : (plan.price.yearly / 12).toFixed(2)
                        }
                      </span>
                      <span className={styles.period}>
                        {key === "free" ? "" : "/month"}
                      </span>
                    </div>
                    
                    {billingPeriod === "yearly" && key !== "free" && (
                      <div className={styles.yearlyInfo}>
                        Billed ${plan.price.yearly} yearly • Save {getSavings(key)}%
                      </div>
                    )}

                    <ul className={styles.featuresList}>
                      {plan.features.map((feature, index) => (
                        <li key={index} className={styles.featureItem}>
                          <i className="bi bi-check-circle-fill"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`${styles.selectBtn} ${key === "premium" ? styles.primaryBtn : styles.secondaryBtn}`}
                      onClick={() => setSelectedPlan(key)}
                    >
                      {key === "free" ? "Get Started Free" : "Start Free Trial"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Comparison */}
      <section className={styles.featuresSection}>
        <Container>
          <h2 className={styles.sectionTitle}>Complete Feature Comparison</h2>
          <div className={styles.tableWrapper}>
            <Table responsive className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Food Explorer</th>
                  <th>Master Chef</th>
                  <th>Culinary Expert</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Recipe Access</td>
                  <td>50+ Basic</td>
                  <td>500+ Premium</td>
                  <td>1000+ Exclusive</td>
                </tr>
                <tr>
                  <td>Video Tutorials</td>
                  <td><i className="bi bi-x-circle text-danger"></i></td>
                  <td><i className="bi bi-check-circle text-success"></i></td>
                  <td><i className="bi bi-check-circle text-success"></i></td>
                </tr>
                <tr>
                  <td>Live Cooking Classes</td>
                  <td><i className="bi bi-x-circle text-danger"></i></td>
                  <td><i className="bi bi-x-circle text-danger"></i></td>
                  <td><i className="bi bi-check-circle text-success"></i></td>
                </tr>
                <tr>
                  <td>1-on-1 Chef Support</td>
                  <td><i className="bi bi-x-circle text-danger"></i></td>
                  <td><i className="bi bi-x-circle text-danger"></i></td>
                  <td><i className="bi bi-check-circle text-success"></i></td>
                </tr>
                <tr>
                  <td>Meal Planning</td>
                  <td><i className="bi bi-x-circle text-danger"></i></td>
                  <td><i className="bi bi-check-circle text-success"></i></td>
                  <td><i className="bi bi-check-circle text-success"></i></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <Container>
          <h2 className={styles.sectionTitle}>What Our Chefs Say</h2>
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className={styles.testimonialCard}>
                  <Card.Body>
                    <div className={styles.testimonialHeader}>
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className={styles.testimonialAvatar}
                        onError={(e) => {
                          e.target.src = "/default-profile.png";
                        }}
                      />
                      <div>
                        <h5 className={styles.testimonialName}>{testimonial.name}</h5>
                        <p className={styles.testimonialRole}>{testimonial.role}</p>
                        <div className={styles.testimonialRating}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className={styles.testimonialReview}>"{testimonial.review}"</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <Container>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <Row>
            <Col lg={8} className="mx-auto">
              <Accordion className={styles.faqAccordion}>
                {faqs.map((faq, index) => (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Start Cooking Like a Pro?</h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of home chefs and start your culinary transformation today
            </p>
            <div className={styles.ctaButtons}>
              <Button className={styles.ctaPrimaryBtn} size="lg">
                <i className="bi bi-rocket-takeoff me-2"></i>
                Start 14-Day Free Trial
              </Button>
              <Button variant="outline-light" className={styles.ctaSecondaryBtn} size="lg">
                <i className="bi bi-play-circle me-2"></i>
                Watch Demo
              </Button>
            </div>
            <div className={styles.ctaFeatures}>
              <span><i className="bi bi-shield-check"></i> No Credit Card Required</span>
              <span><i className="bi bi-arrow-repeat"></i> Cancel Anytime</span>
              <span><i className="bi bi-award"></i> 30-Day Money Back</span>
            </div>
          </div>
        </Container>
      </section>

      <FooterSection />
    </div>
  );
}
