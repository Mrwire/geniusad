import { StructureBuilder } from 'sanity/desk';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pages Group
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Homepage')
                .child(
                  S.document()
                    .schemaType('homepage')
                    .documentId('homepage')
                ),
              S.listItem()
                .title('About Page')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                ),
              S.listItem()
                .title('Contact Page')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                ),
              S.listItem()
                .title('Services Page')
                .child(
                  S.document()
                    .schemaType('servicesPage')
                    .documentId('servicesPage')
                ),
              S.listItem()
                .title('Case Studies Page')
                .child(
                  S.document()
                    .schemaType('caseStudiesPage')
                    .documentId('caseStudiesPage')
                ),
            ])
        ),

      // Subsidiaries
      S.listItem()
        .title('Subsidiaries')
        .schemaType('subsidiary')
        .child(S.documentTypeList('subsidiary').title('Subsidiaries')),

      // Case Studies
      S.listItem()
        .title('Case Studies')
        .schemaType('caseStudy')
        .child(S.documentTypeList('caseStudy').title('Case Studies')),

      // Testimonials
      S.listItem()
        .title('Testimonials')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Testimonials')),

      // Team Members
      S.listItem()
        .title('Team Members')
        .schemaType('teamMember')
        .child(S.documentTypeList('teamMember').title('Team Members')),

      // Services
      S.listItem()
        .title('Services')
        .schemaType('service')
        .child(S.documentTypeList('service').title('Services')),

      // Settings
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Navigation')
                .child(
                  S.document()
                    .schemaType('navigation')
                    .documentId('navigation')
                ),
            ])
        ),
    ]); 