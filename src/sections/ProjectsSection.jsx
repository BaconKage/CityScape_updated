import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import { projects, projectFilters } from '../data/siteData'
import SectionHeader from '../components/ui/SectionHeader'
import AdaptiveImage from '../components/ui/AdaptiveImage'

function ProjectGalleryModal({ project, onClose }) {
  const images = useMemo(() => {
    const media = project.gallery || []
    return media.length > 0 ? media : [project.image]
  }, [project.gallery, project.image])

  const [active, setActive] = useState(0)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (images.length <= 1) return

      if (event.key === 'ArrowLeft') {
        setActive((prev) => (prev - 1 + images.length) % images.length)
      }

      if (event.key === 'ArrowRight') {
        setActive((prev) => (prev + 1) % images.length)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [images.length, onClose])

  const goPrev = () => setActive((prev) => (prev - 1 + images.length) % images.length)
  const goNext = () => setActive((prev) => (prev + 1) % images.length)

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-5xl rounded-3xl border border-white/15 bg-charcoal/95 backdrop-blur-xl p-4 md:p-5"
        initial={{ opacity: 0.75, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0.7, scale: 0.93, y: 12 }}
        transition={{ duration: 0.22 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-gold-100">Project Portfolio</p>
            <h3 className="mt-2 text-2xl">{project.title}</h3>
            <p className="mt-1 text-sm text-stone/85">{project.location}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project gallery"
            className="inline-flex items-center justify-center rounded-full border border-white/20 h-10 w-10 text-stone transition-colors hover:text-gold-100"
            data-interactive
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 relative rounded-2xl overflow-hidden border border-white/10">
          <AdaptiveImage
            src={images[active]}
            alt={`${project.title} ${active + 1}`}
            className="h-[30vh] sm:h-[35vh] md:h-[56vh] w-full object-cover"
            fallback="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-charcoal/75 p-3 text-ivory hover:text-gold-100"
                data-interactive
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-charcoal/75 p-3 text-ivory hover:text-gold-100"
                data-interactive
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-charcoal/85 border border-white/15 px-3 py-1.5 text-xs">
                {active + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        <div className="mt-4 grid gap-3">
          {images.length > 1 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {images.map((image, index) => (
                <button
                  key={`${project.title}-${image}-${index}`}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`overflow-hidden rounded-xl border transition-all ${
                    active === index
                      ? 'border-gold-100 ring-2 ring-gold-100/60'
                      : 'border-white/15 hover:border-white/30'
                  }`}
                  data-interactive
                >
                  <AdaptiveImage
                    src={image}
                    alt={`${project.title} thumbnail ${index + 1}`}
                    className="h-16 w-full object-cover"
                    fallback="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, onViewProject }) {
  return (
    <motion.article
      onClick={() => onViewProject(project)}
      role="button"
      tabIndex={0}
      data-interactive
      data-levitate
      whileTap={{ scale: 0.995 }}
      transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-charcoal/60 cursor-pointer"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onViewProject(project)
        }
      }}
    >
      <div className="relative overflow-hidden h-64">
        <AdaptiveImage
          src={project.image}
          alt={project.title}
          fallback="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-gold-600 text-charcoal text-xs px-3 py-1 font-semibold">
          {project.status}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase text-gold-100 tracking-[0.2em]">{project.category}</p>
        <h3 className="mt-2 text-2xl">{project.title}</h3>
        <p className="text-sm text-stone/80 mt-1">{project.location}</p>
        <div className="mt-3 text-xs text-stone/80 leading-relaxed">
          {project.configuration ? <p>{project.configuration}</p> : null}
          {project.totalLand ? <p>Total Land: {project.totalLand}</p> : null}
          {project.unitSize ? <p>Unit Size: {project.unitSize}</p> : null}
          {project.towers ? <p>{project.towers}</p> : null}
        </div>
        <p className="mt-3 text-sm text-stone/80 leading-relaxed">{project.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="inline-flex items-center gap-2 text-xs px-3 py-1.5 border border-white/15 rounded-full text-ivory/85">
            {project.type}
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm text-gold-100 group-hover:text-gold-200"
            data-interactive
            onClick={(event) => {
              event.stopPropagation()
              onViewProject(project)
            }}
          >
            View Project <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    if (activeFilter === 'Ongoing Projects') {
      return projects.filter((project) => project.status === 'Ongoing Projects')
    }

    if (activeFilter === 'Completed Projects') {
      return projects.filter((project) => project.status === 'Completed Projects')
    }

    return projects.filter(
      (project) =>
        project.category === activeFilter ||
        project.type === activeFilter ||
        project.status === activeFilter,
    )
  }, [activeFilter])

  return (
    <section id="projects" className="section-frame py-16 md:py-24 bg-charcoal/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Developments"
          description="Premium project experiences built for premium buyers, investors, and developers."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              data-interactive
              data-levitate
              className={`rounded-full border px-4 py-2.5 text-sm transition-all ${
                activeFilter === filter
                  ? 'bg-gold-600 text-charcoal border-gold-600'
                  : 'border-white/20 text-stone hover:border-gold-100 hover:text-gold-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="mt-14 text-center section-surface p-8">
            <p className="text-stone/85">No projects for this filter. Select another category.</p>
          </div>
        ) : activeFilter === 'All' ? (
          <div className="mt-10 space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-ivory/95 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(31,164,127,0.8)]" />
                Ongoing Projects
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.filter(p => p.status === 'Ongoing Projects').map((project, idx) => (
                  <motion.div key={project.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                    <ProjectCard project={project} onViewProject={setSelectedProject} />
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-ivory/95 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-urbanBlue-500 shadow-[0_0_12px_rgba(45,93,143,0.8)]" />
                Completed Projects
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.filter(p => p.status === 'Completed Projects').map((project, idx) => (
                  <motion.div key={project.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                    <ProjectCard project={project} onViewProject={setSelectedProject} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <ProjectCard project={project} onViewProject={setSelectedProject} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectGalleryModal
            key={selectedProject.title}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
