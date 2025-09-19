// Blog post data

export const blogPosts = [
  {
    id: 1,
    title: "The Future of Frontend Development with React Server Components",
    excerpt:
      "React Server Components represent a paradigm shift in how we build React applications. In this post, I explore how they work and their impact on performance and developer experience.",
    date: "May 15, 2023",
    slug: "react-server-components",
    categories: ["React", "Web Development", "Performance"],
    content: `
        <p>React Server Components represent a paradigm shift in how we build React applications. This new architecture, developed by the React team, allows components to render on the server, reducing bundle sizes and improving performance.</p>
        
        <h2>What are React Server Components?</h2>
        
        <p>React Server Components (RSC) are a new kind of component that can be rendered on the server. Unlike traditional server-side rendering (SSR), which renders the entire page on the server, RSCs allow for a more granular approach where individual components can be server-rendered.</p>
        
        <p>The key benefits of React Server Components include:</p>
        
        <ul>
          <li>Zero bundle size for server components</li>
          <li>Direct access to backend resources</li>
          <li>Automatic code splitting</li>
          <li>No client-server waterfalls</li>
          <li>Streaming rendering</li>
        </ul>
        
        <h2>How Server Components Work</h2>
        
        <p>With React Server Components, your application is split into two parts:</p>
        
        <ol>
          <li><strong>Server Components</strong>: These components run only on the server and have access to server-side resources like databases, file systems, etc.</li>
          <li><strong>Client Components</strong>: These are traditional React components that run in the browser and can be interactive.</li>
        </ol>
        
        <p>Server Components can fetch data directly from databases or APIs without going through the client, eliminating the need for client-server waterfalls. They can also access the file system and other server-only resources.</p>
        
        <h2>Impact on Performance</h2>
        
        <p>The performance benefits of React Server Components are significant:</p>
        
        <ul>
          <li>Reduced JavaScript bundle size, as Server Components don't send any JavaScript to the client</li>
          <li>Faster initial page load, as less JavaScript needs to be downloaded, parsed, and executed</li>
          <li>Improved time-to-interactive, as the client has less work to do</li>
          <li>Better caching opportunities, as Server Components can be cached on the server</li>
        </ul>
        
        <h2>Developer Experience</h2>
        
        <p>From a developer experience perspective, Server Components offer several advantages:</p>
        
        <ul>
          <li>Simplified data fetching, as you can fetch data directly in your components</li>
          <li>No need for a separate data fetching layer like Redux or React Query for server-only data</li>
          <li>Automatic code splitting without additional configuration</li>
          <li>Familiar React programming model</li>
        </ul>
        
        <h2>Conclusion</h2>
        
        <p>React Server Components represent a significant evolution in how we build React applications. By allowing components to render on the server, they offer performance benefits and a simplified programming model. As this technology matures and becomes more widely adopted, it has the potential to reshape how we think about frontend development.</p>
        
        <p>While there are still challenges to overcome and best practices to establish, the future of frontend development with React Server Components looks promising. As developers, we should start exploring this new paradigm and consider how it might benefit our applications.</p>
      `,
  },
  {
    id: 2,
    title: "Mastering CSS Grid: Advanced Layout Techniques",
    excerpt:
      "CSS Grid has revolutionized how we approach web layouts. In this comprehensive guide, I share advanced techniques for creating complex, responsive layouts with CSS Grid.",
    date: "April 22, 2023",
    readTime: "12 min read",
    slug: "mastering-css-grid",
    categories: ["CSS", "Web Design", "Responsive Design"],
    content: `
        <p>CSS Grid Layout has revolutionized how we create web layouts. It provides a two-dimensional grid-based layout system that gives developers precise control over the placement and sizing of elements. In this article, we'll explore advanced CSS Grid techniques that can help you create complex, responsive layouts.</p>
        
        <h2>Understanding Grid Fundamentals</h2>
        
        <p>Before diving into advanced techniques, let's quickly review the fundamentals of CSS Grid:</p>
        
        <pre><code>
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 20px;
  }
        </code></pre>
        
        <p>This creates a basic 3-column grid with equal-width columns and a 20px gap between items.</p>
        
        <h2>Advanced Grid Techniques</h2>
        
        <h3>1. Named Grid Areas</h3>
        
        <p>Named grid areas allow you to create a visual representation of your layout in your CSS:</p>
        
        <pre><code>
  .container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "header header header header"
      "sidebar main main main"
      "footer footer footer footer";
    gap: 20px;
  }
  
  .header { grid-area: header; }
  .sidebar { grid-area: sidebar; }
  .main { grid-area: main; }
  .footer { grid-area: footer; }
        </code></pre>
        
        <p>This creates a layout with a header spanning all columns, a sidebar taking up one column, main content taking up three columns, and a footer spanning all columns.</p>
        
        <h3>2. Auto-Fit and Auto-Fill</h3>
        
        <p>The auto-fit and auto-fill keywords allow for responsive layouts without media queries:</p>
        
        <pre><code>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
        </code></pre>
        
        <p>This creates as many columns as can fit in the container, with each column being at least 250px wide and expanding to fill available space.</p>
        
        <h3>3. Grid Template Areas for Responsive Layouts</h3>
        
        <p>You can redefine grid areas at different breakpoints for responsive layouts:</p>
        
        <pre><code>
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
    gap: 20px;
  }
  
  @media (min-width: 768px) {
    .container {
      grid-template-columns: 1fr 3fr;
      grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    }
  }
        </code></pre>
        
        <h3>4. Overlapping Grid Items</h3>
        
        <p>Grid items can overlap by using the same grid lines:</p>
        
        <pre><code>
  .item1 {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  
  .item2 {
    grid-column: 2 / 4;
    grid-row: 2 / 4;
    z-index: 1; /* Control stacking order */
  }
        </code></pre>
        
        <h2>Real-World Examples</h2>
        
        <h3>Magazine-Style Layout</h3>
        
        <pre><code>
  .magazine-layout {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 20px;
  }
  
  .featured {
    grid-column: 1 / -1;
    grid-row: 1;
  }
  
  .article-1 {
    grid-column: 1 / 3;
    grid-row: 2;
  }
  
  .article-2 {
    grid-column: 3 / 5;
    grid-row: 2;
  }
  
  .article-3 {
    grid-column: 5 / 7;
    grid-row: 2;
  }
  
  .full-width {
    grid-column: 1 / -1;
    grid-row: 3;
  }
        </code></pre>
        
        <h2>Conclusion</h2>
        
        <p>CSS Grid provides powerful tools for creating complex layouts that were previously difficult or impossible to achieve. By mastering these advanced techniques, you can create more flexible, responsive, and visually interesting designs while maintaining clean, semantic HTML.</p>
        
        <p>Remember that CSS Grid works best when combined with other layout techniques like Flexbox. Use Grid for the overall page layout and Flexbox for alignment within grid items for the most flexible and powerful layouts.</p>
      `,
  },
  {
    id: 3,
    title: "Optimizing Web Performance: A Developer's Guide",
    excerpt:
      "Performance is crucial for user experience. This post covers practical techniques for optimizing your web applications, from code splitting to image optimization and caching strategies.",
    date: "March 10, 2023",
    readTime: "10 min read",
    slug: "optimizing-web-performance",
    categories: ["Performance", "Web Development", "Optimization"],
    content: `
        <p>Web performance optimization is crucial for providing a good user experience. Slow-loading websites lead to higher bounce rates, lower conversion rates, and decreased user satisfaction. In this guide, we'll explore practical techniques for optimizing your web applications.</p>
        
        <h2>Why Performance Matters</h2>
        
        <p>Studies have consistently shown that performance directly impacts business metrics:</p>
        
        <ul>
          <li>Google found that a 0.5s increase in search page loading time decreased traffic by 20%</li>
          <li>Amazon calculated that a 100ms delay in page load time costs them 1% in sales</li>
          <li>53% of mobile users abandon sites that take longer than 3 seconds to load</li>
        </ul>
        
        <h2>Key Performance Metrics</h2>
        
        <p>Before optimizing, it's important to understand what to measure:</p>
        
        <ul>
          <li><strong>First Contentful Paint (FCP)</strong>: When the first content appears</li>
          <li><strong>Largest Contentful Paint (LCP)</strong>: When the largest content element appears</li>
          <li><strong>First Input Delay (FID)</strong>: Time until the page responds to user interaction</li>
          <li><strong>Cumulative Layout Shift (CLS)</strong>: Measures visual stability</li>
          <li><strong>Time to Interactive (TTI)</strong>: When the page becomes fully interactive</li>
        </ul>
        
        <h2>Optimization Techniques</h2>
        
        <h3>1. Code Splitting</h3>
        
        <p>Code splitting involves breaking your JavaScript bundle into smaller chunks that can be loaded on demand:</p>
        
        <pre><code>
  // React example with dynamic imports
  import React, { lazy, Suspense } from 'react';
  
  const HeavyComponent = lazy(() => import('./HeavyComponent'));
  
  function App() {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      </div>
    );
  }
        </code></pre>
        
        <h3>2. Image Optimization</h3>
        
        <p>Images often account for the largest portion of page weight. Optimize them by:</p>
        
        <ul>
          <li>Using modern formats like WebP or AVIF</li>
          <li>Implementing responsive images with srcset</li>
          <li>Lazy loading images below the fold</li>
          <li>Properly sizing images</li>
        </ul>
        
        <pre><code>
  <img 
    src="small.jpg" 
    srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 1500w" 
    sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 1500px" 
    loading="lazy" 
    alt="Responsive image"
  />
        </code></pre>
        
        <h3>3. Caching Strategies</h3>
        
        <p>Implement effective caching to reduce server requests:</p>
        
        <ul>
          <li>Set appropriate Cache-Control headers</li>
          <li>Implement service workers for offline access</li>
          <li>Use versioned file names or query strings for cache busting</li>
        </ul>
        
        <pre><code>
  // Service worker registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(error => {
        console.log('SW registration failed: ', error);
      });
    });
  }
        </code></pre>
        
        <h3>4. Critical CSS</h3>
        
        <p>Extract and inline critical CSS to render the above-the-fold content quickly:</p>
        
        <pre><code>
  <head>
    <style>
      /* Critical CSS here */
      header { background-color: #f8f9fa; padding: 20px; }
      .hero { height: 80vh; display: flex; align-items: center; }
      /* ... */
    </style>
    <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="styles.css"></noscript>
  </head>
        </code></pre>
        
        <h3>5. Reduce JavaScript Execution Time</h3>
        
        <p>Minimize the impact of JavaScript on performance:</p>
        
        <ul>
          <li>Defer non-critical JavaScript</li>
          <li>Use Web Workers for CPU-intensive tasks</li>
          <li>Optimize event listeners and avoid layout thrashing</li>
        </ul>
        
        <h2>Tools for Performance Measurement</h2>
        
        <ul>
          <li><strong>Lighthouse</strong>: Automated tool for improving web page quality</li>
          <li><strong>WebPageTest</strong>: Allows testing from multiple locations and browsers</li>
          <li><strong>Chrome DevTools Performance panel</strong>: For detailed runtime performance analysis</li>
          <li><strong>Core Web Vitals report</strong> in Google Search Console</li>
        </ul>
        
        <h2>Conclusion</h2>
        
        <p>Web performance optimization is an ongoing process, not a one-time task. By implementing these techniques and regularly measuring performance, you can provide a better user experience, improve conversion rates, and enhance your site's search engine rankings.</p>
        
        <p>Remember that the most effective optimizations target your specific performance bottlenecks, so always measure first, then optimize based on data.</p>
      `,
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    excerpt:
      "Accessibility is not just a nice-to-have feature but a necessity. Learn how to make your web applications accessible to everyone, including people with disabilities.",
    date: "February 18, 2023",
    readTime: "9 min read",
    slug: "building-accessible-web-applications",
    categories: ["Accessibility", "Web Development", "UX"],
    content: `
        <p>Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites and tools. This article explores practical techniques for building accessible web applications.</p>
        
        <h2>Why Accessibility Matters</h2>
        
        <p>Accessibility is important for several reasons:</p>
        
        <ul>
          <li><strong>Inclusivity</strong>: About 15% of the world's population lives with some form of disability</li>
          <li><strong>Legal requirements</strong>: Many countries have laws requiring digital accessibility</li>
          <li><strong>Better UX for everyone</strong>: Accessible design often improves usability for all users</li>
          <li><strong>SEO benefits</strong>: Many accessibility practices improve search engine optimization</li>
        </ul>
        
        <h2>Key Accessibility Principles</h2>
        
        <p>The Web Content Accessibility Guidelines (WCAG) define four main principles:</p>
        
        <ol>
          <li><strong>Perceivable</strong>: Information must be presentable to users in ways they can perceive</li>
          <li><strong>Operable</strong>: User interface components must be operable</li>
          <li><strong>Understandable</strong>: Information and operation must be understandable</li>
          <li><strong>Robust</strong>: Content must be robust enough to be interpreted by a variety of user agents</li>
        </ol>
        
        <h2>Practical Implementation Techniques</h2>
        
        <h3>1. Semantic HTML</h3>
        
        <p>Using the right HTML elements for their intended purpose is the foundation of accessibility:</p>
        
        <pre><code>
  <!-- Bad -->
  <div class="button" onclick="submit()">Submit</div>
  
  <!-- Good -->
  <button type="submit">Submit</button>
        </code></pre>
        
        <p>Semantic HTML provides meaning to screen readers and other assistive technologies.</p>
        
        <h3>2. Keyboard Navigation</h3>
        
        <p>Ensure all interactive elements are keyboard accessible:</p>
        
        <ul>
          <li>Use proper focus management</li>
          <li>Implement logical tab order</li>
          <li>Provide visible focus indicators</li>
          <li>Create keyboard shortcuts for complex interactions</li>
        </ul>
        
        <pre><code>
  /* Enhance focus styles */
  :focus {
    outline: 3px solid #4299e1;
    outline-offset: 2px;
  }
  
  /* Hide outline for mouse users but show for keyboard */
  :focus:not(:focus-visible) {
    outline: none;
  }
  
  :focus-visible {
    outline: 3px solid #4299e1;
    outline-offset: 2px;
  }
        </code></pre>
        
        <h3>3. ARIA When Necessary</h3>
        
        <p>ARIA (Accessible Rich Internet Applications) attributes enhance accessibility when HTML alone isn't enough:</p>
        
        <pre><code>
  <div role="alert" aria-live="assertive">
    Form submitted successfully!
  </div>
  
  <button aria-expanded="false" aria-controls="menu-content">
    Menu
  </button>
  <div id="menu-content" hidden>
    <!-- Menu items -->
  </div>
        </code></pre>
        
        <p>Remember: No ARIA is better than bad ARIA. Only use ARIA when necessary and test thoroughly.</p>
        
        <h3>4. Color and Contrast</h3>
        
        <p>Ensure sufficient color contrast and don't rely solely on color to convey information:</p>
        
        <ul>
          <li>Text should have a contrast ratio of at least 4.5:1 (WCAG AA)</li>
          <li>Large text (18pt+) should have a contrast ratio of at least 3:1</li>
          <li>Always pair color with another indicator (icon, text, pattern)</li>
        </ul>
        
        <h3>5. Forms and Error Handling</h3>
        
        <p>Create accessible forms with clear labels, instructions, and error messages:</p>
        
        <pre><code>
  <div>
    <label for="email">Email Address</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      aria-describedby="email-hint email-error"
      aria-invalid="true"
    />
    <p id="email-hint">We'll never share your email</p>
    <p id="email-error" role="alert">Please enter a valid email address</p>
  </div>
        </code></pre>
        
        <h3>6. Images and Media</h3>
        
        <p>Provide text alternatives for non-text content:</p>
        
        <pre><code>
  <!-- Informative image -->
  <img src="chart.png" alt="Sales increased by 25% in Q2 2023" />
  
  <!-- Decorative image -->
  <img src="decoration.png" alt="" role="presentation" />
  
  <!-- Complex image -->
  <figure>
    <img src="complex-chart.png" alt="Q2 2023 Financial Results" />
    <figcaption>
      Figure 1: Detailed breakdown of Q2 2023 financial results showing 
      revenue growth across all departments.
      <a href="data.html">View the data table</a>
    </figcaption>
  </figure>
        </code></pre>
        
        <h2>Testing for Accessibility</h2>
        
        <p>Use a combination of automated and manual testing:</p>
        
        <ul>
          <li><strong>Automated tools</strong>: Lighthouse, axe, WAVE</li>
          <li><strong>Screen reader testing</strong>: NVDA, JAWS, VoiceOver</li>
          <li><strong>Keyboard-only navigation</strong>: Try using your site without a mouse</li>
          <li><strong>Color contrast analyzers</strong>: WebAIM Contrast Checker</li>
          <li><strong>User testing</strong> with people who have disabilities</li>
        </ul>
        
        <h2>Conclusion</h2>
        
        <p>Building accessible web applications is not just about compliance—it's about creating inclusive experiences that work for everyone. By following these practices and continuously learning about accessibility, you can make a significant positive impact on your users' experiences.</p>
        
        <p>Remember that accessibility is a journey, not a destination. Start with the basics, test regularly, and continuously improve your applications to make them more accessible over time.</p>
      `,
  },
];
