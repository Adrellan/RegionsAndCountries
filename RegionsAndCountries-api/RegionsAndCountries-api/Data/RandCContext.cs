using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using RegionsAndCountries_api.Models;

namespace RegionsAndCountries_api.Data
{
    public partial class RandCContext : DbContext
    {
        public RandCContext()
        {
        }

        public RandCContext(DbContextOptions<RandCContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Country> Countries { get; set; } = null!;
        public virtual DbSet<Regio> Regios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=RandC;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>(entity =>
            {
                entity.HasKey(e => e.Ctyid);

                entity.ToTable("Country");

                entity.HasIndex(e => e.Ctyname, "IX_Country")
                    .IsUnique();

                entity.Property(e => e.Ctyid).HasColumnName("ctyid");

                entity.Property(e => e.Ctyname)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ctyname");

                entity.Property(e => e.Ctyregid).HasColumnName("ctyregid");

                entity.HasOne(d => d.Ctyreg)
                    .WithMany(p => p.Countries)
                    .HasForeignKey(d => d.Ctyregid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Country_Regio");
            });

            modelBuilder.Entity<Regio>(entity =>
            {
                entity.HasKey(e => e.Regid);

                entity.ToTable("Regio");

                entity.Property(e => e.Regid).HasColumnName("regid");

                entity.Property(e => e.Regname)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("regname");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
