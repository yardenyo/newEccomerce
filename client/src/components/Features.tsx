import FeatureItem from "@/components/FeatureItem";

const Features = () => {
  return (
    <section className="container mx-auto py-4 px-8 lg:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FeatureItem
          iconClass="pi pi-truck text-5xl"
          title="Free Shipping"
          description="Free shipping on all orders"
        />
        <FeatureItem
          iconClass="pi pi-money-bill text-5xl"
          title="Money Back"
          description="30 Days money back guarantee"
        />
        <FeatureItem
          iconClass="pi pi-lock text-5xl"
          title="Secure Payments"
          description="Secured by Stripe"
        />
        <FeatureItem
          iconClass="pi pi-phone text-5xl"
          title="24/7 Support"
          description="Phone and email support"
        />
      </div>
    </section>
  );
};

export default Features;
