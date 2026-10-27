import unittest

from support import run_solution


class GetGradesTest(unittest.TestCase):
    def test_case_01_92_prints_a(self):
        """92 prints A."""
        result = run_solution('get-grades', '92\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A\n')

    def test_case_02_85_prints_b(self):
        """85 prints B."""
        result = run_solution('get-grades', '85\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'B\n')

    def test_case_03_65_prints_c(self):
        """65 prints C."""
        result = run_solution('get-grades', '65\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'C\n')

    def test_case_04_45_prints_f(self):
        """45 prints F."""
        result = run_solution('get-grades', '45\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'F\n')


if __name__ == "__main__":
    unittest.main()
