<template>
  <BaseSection id="management-projects" override="px-2 py-2 md:px-4 md:py-4">
    <div>
      <div class="mb-8 flex items-center justify-between">
        <BaseHeading title="Project" description="Manage your portfolio content" />

        <BaseButton to="/management/projects/create" variant="filled"> + New Project </BaseButton>
      </div>

      <ManagementProjectTable />
    </div>
  </BaseSection>
</template>
