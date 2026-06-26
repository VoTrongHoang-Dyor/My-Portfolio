import SkillsGraph from './SkillsGraph';
import SkillShowcase from '@/components/ui/SkillShowcase';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="eyebrow">Toolbox</div>
      <h2 className="section-title">What I build with</h2>
      <SkillsGraph />
      <SkillShowcase />
    </section>
  );
}
