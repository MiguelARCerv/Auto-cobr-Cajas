export default function BannerPromo() {
  return (
    <div
      className="mb-6 h-40 w-full rounded-xl bg-cover bg-center flex items-end p-4"
      style={{
        backgroundImage:
          'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDeRCOvz9iN-R9_5-c3uVxsoEQJYNlrZ-CJO89SR2gFzmgqbZYrt0TwqCHWeeYGKXoPur0u8Jhe7XYFp-7jLeH2U-CdtAWEqzRyYeziFjCIpD8Fz4gZfYiJEYSZ2mOj8F8CGOHxTX2xVUc9-G0GeIgt5EuNYWeDT29p3aw7bAEfYSHAq_OVjhpNknVanP2zMZnYzNHbGkt8MsFMVrrfCy7Dq_G3HccAiMhBxLfwDA0Q3vGnZh5ckHJ53jHn5RYJp4eulfto_2GB454")',
      }}
    >
      <div>
        <h2 className="text-2xl font-bold text-white">20% en Lácteos</h2>
        <p className="text-sm text-white/90">¡Solo por esta semana!</p>
      </div>
    </div>
  );
}
