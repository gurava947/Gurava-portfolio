import unittest

from support import run_solution


class PrintSmallestLetterTest(unittest.TestCase):
    def test_case_01_python(self):
        """python."""
        result = run_solution('print-smallest-letter', 'python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'h\n')

    def test_case_02_anana(self):
        """Banana."""
        result = run_solution('print-smallest-letter', 'Banana\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'B\n')


if __name__ == "__main__":
    unittest.main()
