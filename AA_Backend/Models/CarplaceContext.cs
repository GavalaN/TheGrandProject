using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AA_Backend.Models;

public partial class CarplaceContext : DbContext
{
    public CarplaceContext()
    {
    }

    public CarplaceContext(DbContextOptions<CarplaceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Car> Cars { get; set; }

    public virtual DbSet<Color> Colors { get; set; }

    public virtual DbSet<Pictue> Pictues { get; set; }

    public virtual DbSet<Type> Types { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySQL("SERVER=localhost;PORT=3306;DATABASE=carplace;USER=root;PASSWORD=;SSL MODE=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("brands");

            entity.Property(e => e.Id)
                .HasColumnType("int(9)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Car>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("cars");

            entity.HasIndex(e => e.BrandId, "brand_id");

            entity.HasIndex(e => e.ColorId, "color_id");

            entity.HasIndex(e => e.SellerId, "seller_id");

            entity.HasIndex(e => e.TypeId, "type_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(9)")
                .HasColumnName("id");
            entity.Property(e => e.BodyType)
                .HasMaxLength(32)
                .HasColumnName("body_type");
            entity.Property(e => e.BrandId)
                .HasColumnType("int(9)")
                .HasColumnName("brand_id");
            entity.Property(e => e.Cc)
                .HasColumnType("int(11)")
                .HasColumnName("cc");
            entity.Property(e => e.ColorId)
                .HasColumnType("int(9)")
                .HasColumnName("color_id");
            entity.Property(e => e.Description)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Drive)
                .HasMaxLength(50)
                .HasColumnName("drive");
            entity.Property(e => e.EngineType)
                .HasMaxLength(12)
                .HasColumnName("engine_type");
            entity.Property(e => e.FuelType)
                .HasMaxLength(32)
                .HasColumnName("fuel_type");
            entity.Property(e => e.Horsepower)
                .HasColumnType("int(11)")
                .HasColumnName("horsepower");
            entity.Property(e => e.KWeight)
                .HasColumnType("int(11)")
                .HasColumnName("k_weight");
            entity.Property(e => e.KmClock)
                .HasColumnType("int(11)")
                .HasColumnName("km_clock");
            entity.Property(e => e.NumOfCyl)
                .HasColumnType("int(11)")
                .HasColumnName("num_of_cyl");
            entity.Property(e => e.Price)
                .HasColumnType("int(11)")
                .HasColumnName("price");
            entity.Property(e => e.SellerId)
                .HasColumnType("int(9)")
                .HasColumnName("seller_id");
            entity.Property(e => e.Sold).HasColumnName("sold");
            entity.Property(e => e.TransType)
                .HasMaxLength(50)
                .HasColumnName("trans_type");
            entity.Property(e => e.TypeId)
                .HasColumnType("int(9)")
                .HasColumnName("type_id");
            entity.Property(e => e.UploadDate)
                .HasColumnType("datetime")
                .HasColumnName("upload_date");
            entity.Property(e => e.Year).HasColumnType("int(9)");

            entity.HasOne(d => d.Brand).WithMany(p => p.Cars)
                .HasForeignKey(d => d.BrandId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("cars_ibfk_1");

            entity.HasOne(d => d.Color).WithMany(p => p.Cars)
                .HasForeignKey(d => d.ColorId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("cars_ibfk_3");

            entity.HasOne(d => d.Seller).WithMany(p => p.Cars)
                .HasForeignKey(d => d.SellerId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("cars_ibfk_4");

            entity.HasOne(d => d.Type).WithMany(p => p.Cars)
                .HasForeignKey(d => d.TypeId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("cars_ibfk_2");
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("colors");

            entity.Property(e => e.Id)
                .HasColumnType("int(9)")
                .HasColumnName("id");
            entity.Property(e => e.Hexcode)
                .HasMaxLength(9)
                .HasColumnName("hexcode");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Pictue>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("pictues");

            entity.HasIndex(e => e.CarId, "car_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(8)")
                .HasColumnName("id");
            entity.Property(e => e.CarId)
                .HasColumnType("int(11)")
                .HasColumnName("car_id");
            entity.Property(e => e.FilePath)
                .HasMaxLength(124)
                .HasColumnName("filePath");

            entity.HasOne(d => d.Car).WithMany(p => p.Pictues)
                .HasForeignKey(d => d.CarId)
                .HasConstraintName("pictues_ibfk_1");
        });

        modelBuilder.Entity<Type>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("types");

            entity.HasIndex(e => e.BrandId, "brand_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(9)")
                .HasColumnName("id");
            entity.Property(e => e.BrandId)
                .HasColumnType("int(9)")
                .HasColumnName("brand_id");
            entity.Property(e => e.TypeName)
                .HasMaxLength(255)
                .HasColumnName("type_name");

            entity.HasOne(d => d.Brand).WithMany(p => p.Types)
                .HasForeignKey(d => d.BrandId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("types_ibfk_1");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.Id)
                .HasColumnType("int(9)")
                .HasColumnName("id");
            entity.Property(e => e.Created)
                .HasColumnType("datetime")
                .HasColumnName("created");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Hash)
                .HasMaxLength(255)
                .HasColumnName("HASH");
            entity.Property(e => e.IsActive).HasColumnType("int(1)");
            entity.Property(e => e.IsAdmin).HasColumnName("is_admin");
            entity.Property(e => e.PhoneNum)
                .HasMaxLength(50)
                .HasColumnName("phone_num");
            entity.Property(e => e.ResetPasswordToken)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'");
            entity.Property(e => e.ResetPasswordTokenExpiry)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("datetime");
            entity.Property(e => e.Salt)
                .HasMaxLength(64)
                .HasColumnName("SALT");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
