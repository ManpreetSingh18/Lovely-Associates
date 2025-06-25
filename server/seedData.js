import mongoose from 'mongoose';
import Blog from './models/Blog.js';
import connectDB from './config/database.js';

// Sample blog data to seed the database
const sampleBlogs = [
  {
    title: "Top 5 Residential Areas in Geeta Colony for Young Professionals",
    summary: "Discover the best neighborhoods in Geeta Colony that offer perfect blend of affordability, connectivity, and modern amenities for working professionals.",
    content: `
      <p>Geeta Colony has emerged as one of East Delhi's most sought-after residential destinations, particularly among young professionals seeking the perfect balance of affordability, connectivity, and modern living. With its strategic location and rapidly developing infrastructure, this vibrant neighborhood offers numerous opportunities for those looking to establish their roots in Delhi.</p>

      <h2>1. Geeta Colony Main Market Area</h2>
      <p>The heart of Geeta Colony, this area offers <strong>excellent connectivity</strong> to major business districts while maintaining affordable housing options. The proximity to the metro station makes it ideal for daily commuters, with travel times to Connaught Place under 30 minutes.</p>

      <h2>2. Yamuna Sports Complex Vicinity</h2>
      <p>Properties near the Yamuna Sports Complex offer a unique advantage of <strong>recreational facilities</strong> right at your doorstep. This area is perfect for fitness enthusiasts and those who value work-life balance.</p>

      <h2>3. IP Extension Border</h2>
      <p>The border area with IP Extension provides the best of both worlds - the tranquility of Geeta Colony with easy access to IP Extension's commercial hub. <strong>Rental yields</strong> in this area have shown consistent growth over the past three years.</p>

      <h2>4. Krishna Nagar Junction</h2>
      <p>This well-connected area offers excellent public transportation options and is surrounded by educational institutions, making it perfect for young professionals planning for the future.</p>

      <h2>5. Shastri Park Metro Corridor</h2>
      <p>The newest addition to our top picks, this area has seen significant development following the metro connectivity improvements. <strong>Property appreciation</strong> rates here are among the highest in East Delhi.</p>

      <h3>Why Choose Geeta Colony?</h3>
      <ul>
        <li><strong>Affordability:</strong> 20-30% lower than Central Delhi rates</li>
        <li><strong>Connectivity:</strong> Multiple metro lines and bus routes</li>
        <li><strong>Amenities:</strong> Shopping centers, hospitals, and educational institutions</li>
        <li><strong>Growth Potential:</strong> Rapid infrastructure development</li>
      </ul>

      <p>Ready to explore these amazing residential options? Contact our expert team for personalized property recommendations and site visits.</p>
    `,
    tags: ["Geeta Colony", "Residential"],
    thumbnail: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Krishna Nagar Property Market Trends: What to Expect in 2025",
    summary: "Analysis of current property prices, upcoming developments, and investment opportunities in Krishna Nagar's rapidly growing real estate market.",
    content: `
      <p>Krishna Nagar's real estate market has shown remarkable resilience and growth potential throughout 2024. As we approach 2025, several key trends are shaping the investment landscape in this prime East Delhi location.</p>

      <h2>Current Market Overview</h2>
      <p>Property prices in Krishna Nagar have appreciated by <strong>12-15%</strong> over the past year, outperforming many other East Delhi localities. This growth is driven by improved infrastructure, metro connectivity, and increasing demand from both end-users and investors.</p>

      <h2>Key Trends for 2025</h2>

      <h3>1. Infrastructure Development</h3>
      <p>The upcoming <strong>Delhi Metro Phase IV</strong> extensions will further enhance connectivity, potentially increasing property values by 20-25% in the next two years.</p>

      <h3>2. Commercial Growth</h3>
      <p>New commercial complexes and office spaces are attracting businesses, creating a positive impact on residential demand and rental yields.</p>

      <h3>3. Smart City Initiatives</h3>
      <p>Government initiatives for smart infrastructure development are making Krishna Nagar more attractive to tech-savvy buyers and investors.</p>

      <h2>Investment Opportunities</h2>
      <ul>
        <li><strong>Residential Apartments:</strong> 2-3 BHK units showing highest demand</li>
        <li><strong>Commercial Spaces:</strong> Ground floor retail showing 8-10% rental yields</li>
        <li><strong>Plot Development:</strong> Land prices expected to rise 15-20% annually</li>
      </ul>

      <p>Interested in Krishna Nagar investments? Schedule a consultation with our market experts today.</p>
    `,
    tags: ["Krishna Nagar", "Market Analysis"],
    thumbnail: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Complete Guide to Buying Your First Home in Delhi",
    summary: "Step-by-step guide covering everything from budget planning to documentation, making your first home purchase journey smooth and informed.",
    content: `
      <p>Buying your first home is one of life's most significant milestones. In Delhi's dynamic real estate market, being well-prepared can make the difference between a smooth transaction and a stressful experience.</p>

      <h2>Step 1: Financial Planning and Pre-approval</h2>
      <p>Before you start house hunting, establish a clear budget. Consider these factors:</p>
      <ul>
        <li><strong>Down Payment:</strong> Typically 10-20% of property value</li>
        <li><strong>Home Loan Eligibility:</strong> Usually 80-90% of property value</li>
        <li><strong>Additional Costs:</strong> Registration, stamp duty, legal fees (3-5% of property value)</li>
        <li><strong>Monthly EMI:</strong> Should not exceed 40% of your monthly income</li>
      </ul>

      <h2>Step 2: Research and Location Selection</h2>
      <p>Delhi offers diverse neighborhoods, each with unique advantages:</p>
      <ul>
        <li><strong>East Delhi:</strong> Affordable options with good connectivity</li>
        <li><strong>South Delhi:</strong> Premium locations with established infrastructure</li>
        <li><strong>West Delhi:</strong> Emerging areas with growth potential</li>
        <li><strong>North Delhi:</strong> Traditional areas with cultural significance</li>
      </ul>

      <p>Ready to start your home-buying journey? Contact our experienced team for personalized guidance and support throughout the process.</p>
    `,
    tags: ["Home Buying", "Delhi"],
    thumbnail: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared existing blog posts');

    // Insert sample blogs
    const blogs = await Blog.insertMany(sampleBlogs);
    console.log(`Inserted ${blogs.length} blog posts`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();